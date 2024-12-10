using Azure;
using Azure.AI.TextAnalytics;
using Microsoft.Extensions.Logging;
using Moq;

namespace ChatApi.Services.Tests
{
    [TestFixture]
    internal class TextAnalyticsTests
    {
        private Mock<TextAnalyticsClient> textAnalyticsClientMock;
        private Mock<ILogger<TextAnalytics>> loggerMock;
        private TextAnalytics textAnalytics;

        [SetUp]
        public void SetUp()
        {
            textAnalyticsClientMock = new Mock<TextAnalyticsClient>();
            loggerMock = new Mock<ILogger<TextAnalytics>>();
            textAnalytics = new TextAnalytics(textAnalyticsClientMock.Object, loggerMock.Object);
        }

        [Test]
        public async Task AnalyzeSentimentAsync_RequestFailedException_ReturnsUnknown()
        {
            // Arrange
            var inputText = "This input will trigger an error.";
            var exception = new RequestFailedException(500, "Simulated failure");
            textAnalyticsClientMock
                .Setup(client => client.AnalyzeSentimentAsync(inputText, It.IsAny<string>(), It.IsAny<AnalyzeSentimentOptions>(), It.IsAny<CancellationToken>()))
                .ThrowsAsync(exception);

            // Act
            var result = await textAnalytics.AnalyzeSentimentAsync(inputText);

            // Assert
            Assert.That(result, Is.EqualTo("Unknown"));

            textAnalyticsClientMock.Verify(client => client.AnalyzeSentimentAsync(inputText, It.IsAny<string>(), It.IsAny<AnalyzeSentimentOptions>(), It.IsAny<CancellationToken>()), Times.Once);
            loggerMock.Verify(x => x.Log(
               LogLevel.Error,
               It.IsAny<EventId>(),
               It.IsAny<It.IsAnyType>(),
               It.IsAny<Exception>(),
               It.IsAny<Func<It.IsAnyType, Exception?, string>>()
               ), Times.Exactly(1));
        }
    }
}