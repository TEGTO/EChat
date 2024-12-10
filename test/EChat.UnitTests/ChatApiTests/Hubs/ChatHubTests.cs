using AutoMapper;
using ChatApi.Data;
using ChatApi.Data.Repository;
using ChatApi.Dtos;
using ChatApi.Services;
using Microsoft.AspNetCore.SignalR;
using Moq;

namespace ChatApi.Hubs.Tests
{
    [TestFixture]
    internal class ChatHubTests
    {
        private Mock<IMessageRepository> messageRepositoryMock;
        private Mock<IMapper> mapperMock;
        private Mock<ITextAnalytics> textAnalyticsMock;
        private Mock<IHubCallerClients<IChatClient>> clientsMock;
        private Mock<IChatClient> chatClientMock;
        private Mock<HubCallerContext> contextMock;
        private ChatHub chatHub;

        [SetUp]
        public void SetUp()
        {
            messageRepositoryMock = new Mock<IMessageRepository>();
            mapperMock = new Mock<IMapper>();
            textAnalyticsMock = new Mock<ITextAnalytics>();
            clientsMock = new Mock<IHubCallerClients<IChatClient>>();
            chatClientMock = new Mock<IChatClient>();
            contextMock = new Mock<HubCallerContext>();

            clientsMock.Setup(c => c.Caller).Returns(chatClientMock.Object);
            clientsMock.Setup(c => c.All).Returns(chatClientMock.Object);

            chatHub = new ChatHub(messageRepositoryMock.Object, mapperMock.Object, textAnalyticsMock.Object)
            {
                Clients = clientsMock.Object,
                Context = contextMock.Object
            };
        }

        [TearDown]
        public void TearDown()
        {
            chatHub.Dispose();
        }

        [Test]
        public async Task OnConnectedAsync_LoadsAllMessages()
        {
            // Arrange
            var messages = new List<MessageEntity>
            {
                new MessageEntity { Name = "User1", Text = "Hello", UserId = "1", Sentiment = "Positive" },
                new MessageEntity { Name = "User2", Text = "Hi", UserId = "2", Sentiment = "Neutral" }
            };

            messageRepositoryMock.Setup(repo => repo.GetMessagesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(messages);

            mapperMock.Setup(m => m.Map<Message>(It.IsAny<MessageEntity>())).Returns((MessageEntity entity) => new Message
            {
                Name = entity.Name,
                Text = entity.Text!,
                UserId = entity.UserId,
                Sentiment = entity.Sentiment
            });

            // Act
            await chatHub.OnConnectedAsync();

            // Assert
            chatClientMock.Verify(c => c.LoadMessages(It.IsAny<IEnumerable<Message>>()), Times.Once);

            messageRepositoryMock.Verify(repo => repo.GetMessagesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test]
        public async Task SendMessage_AnalyzesSentimentAndBroadcastsMessage()
        {
            // Arrange
            var message = new Message { Name = "User1", Text = "Hello World", UserId = "1" };
            var sentiment = "Positive";

            textAnalyticsMock.Setup(ta => ta.AnalyzeSentimentAsync(message.Text, It.IsAny<CancellationToken>()))
                .ReturnsAsync(sentiment);

            mapperMock.Setup(m => m.Map<MessageEntity>(It.IsAny<Message>())).Returns((Message msg) => new MessageEntity
            {
                Name = msg.Name,
                Text = msg.Text,
                UserId = msg.UserId,
                Sentiment = msg.Sentiment
            });

            // Act
            await chatHub.SendMessage(message);

            // Assert
            Assert.That(message.Sentiment, Is.EqualTo(sentiment));

            chatClientMock.Verify(c => c.ReceiveMessage(It.Is<Message>(m =>
                m.Text == message.Text &&
                m.Sentiment == sentiment &&
                m.Name == message.Name &&
                m.UserId == message.UserId)), Times.Once);

            messageRepositoryMock.Verify(repo => repo.AddMessageAsync(It.IsAny<MessageEntity>(), It.IsAny<CancellationToken>()), Times.Once);

            textAnalyticsMock.Verify(repo => repo.AnalyzeSentimentAsync(message.Text, It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}