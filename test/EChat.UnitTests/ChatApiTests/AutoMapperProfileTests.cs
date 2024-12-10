using AutoMapper;
using ChatApi.Data;
using ChatApi.Dtos;

namespace LibraryApi.Tests
{
    [TestFixture]
    internal class AutoMapperProfileTests
    {
        private IMapper mapper;

        [SetUp]
        public void SetUp()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            });

            mapper = config.CreateMapper();
        }

        [Test]
        [TestCase("TestUser", "Hello, World!", "user123", "Positive", Description = "Maps Message to MessageEntity correctly.")]
        public void Map_MessageToMessageEntity_MapsCorrectly(string name, string text, string userId, string sentiment)
        {
            // Arrange
            var message = new Message
            {
                Name = name,
                Text = text,
                UserId = userId,
                Sentiment = sentiment
            };

            // Act
            var result = mapper.Map<MessageEntity>(message);

            // Assert
            Assert.That(result.Name, Is.EqualTo(name));
            Assert.That(result.Text, Is.EqualTo(text));
            Assert.That(result.UserId, Is.EqualTo(userId));
            Assert.That(result.Sentiment, Is.EqualTo(sentiment));
        }

        [Test]
        [TestCase("TestUser", "Hello, World!", "user123", "Positive", Description = "Maps MessageEntity to Message correctly.")]
        public void Map_MessageEntityToMessage_MapsCorrectly(string name, string text, string userId, string sentiment)
        {
            // Arrange
            var messageEntity = new MessageEntity
            {
                Name = name,
                Text = text,
                UserId = userId,
                Sentiment = sentiment,
                CreatedAt = DateTime.UtcNow
            };

            // Act
            var result = mapper.Map<Message>(messageEntity);

            // Assert
            Assert.That(result.Name, Is.EqualTo(name));
            Assert.That(result.Text, Is.EqualTo(text));
            Assert.That(result.UserId, Is.EqualTo(userId));
            Assert.That(result.Sentiment, Is.EqualTo(sentiment));
        }
    }
}