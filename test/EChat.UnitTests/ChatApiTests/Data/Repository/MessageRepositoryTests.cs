using DatabaseControl.Repositories;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;

namespace ChatApi.Data.Repository.Tests
{
    [TestFixture]
    internal class MessageRepositoryTests
    {
        private Mock<IDatabaseRepository<MessageDbContext>> repositoryMock;
        private MessageRepository messageRepository;
        private CancellationToken cancellationToken;

        [SetUp]
        public void SetUp()
        {
            repositoryMock = new Mock<IDatabaseRepository<MessageDbContext>>();
            messageRepository = new MessageRepository(repositoryMock.Object);
            cancellationToken = new CancellationToken();
        }

        private static Mock<DbSet<T>> GetDbSetMock<T>(List<T> data) where T : class
        {
            return data.AsQueryable().BuildMockDbSet();
        }

        [Test]
        [TestCase("John Doe", "Hello!", "user1", "Positive", Description = "Adds a valid message with sentiment Positive.")]
        [TestCase("Jane Doe", "This is bad", "user2", "Negative", Description = "Adds a valid message with sentiment Negative.")]
        public async Task AddMessageAsync_TestCases(string name, string text, string userId, string sentiment)
        {
            // Arrange
            var message = new MessageEntity
            {
                Name = name,
                Text = text,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                Sentiment = sentiment
            };

            // Act
            await messageRepository.AddMessageAsync(message, cancellationToken);

            // Assert
            repositoryMock.Verify(repo => repo.AddAsync(message, cancellationToken), Times.Once);
        }

        [Test]
        [TestCase(3, Description = "Retrieves three messages ordered by CreatedAt.")]
        [TestCase(0, Description = "Retrieves no messages when database is empty.")]
        public async Task GetMessagesAsync_TestCases(int messageCount)
        {
            // Arrange
            var messages = Enumerable.Range(1, messageCount).Select(i => new MessageEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = $"User{i}",
                Text = $"Message {i}",
                UserId = $"user{i}",
                CreatedAt = DateTime.UtcNow.AddMinutes(-i),
                Sentiment = i % 2 == 0 ? "Positive" : "Neutral"
            }).ToList();

            var dbSetMock = GetDbSetMock(messages);
            repositoryMock.Setup(repo => repo.GetQueryableAsync<MessageEntity>(cancellationToken))
                .ReturnsAsync(dbSetMock.Object);

            // Act
            var result = await messageRepository.GetMessagesAsync(cancellationToken);

            // Assert
            Assert.That(result.Count(), Is.EqualTo(messageCount));
            if (messageCount > 0)
            {
                Assert.That(result.First().CreatedAt, Is.LessThan(result.Last().CreatedAt));
            }
            repositoryMock.Verify(repo => repo.GetQueryableAsync<MessageEntity>(cancellationToken), Times.Once);
        }
    }
}