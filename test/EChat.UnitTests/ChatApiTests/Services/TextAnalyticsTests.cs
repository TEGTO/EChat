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
        [TestCase("I love this product!", "Positive", Description = "Text with positive sentiment.")]
        [TestCase("This is okay.", "Neutral", Description = "Text with neutral sentiment.")]
        [TestCase("I hate this service!", "Negative", Description = "Text with negative sentiment.")]
        public async Task AnalyzeSentimentAsync_ValidText_ReturnsSentiment(string inputText, string expectedSentiment)
        {
            // Arrange
            var responseMock = new Mock<Response<DocumentSentiment>>();
            //responseMock.SetupGet(r => r.Value).Returns(new DocumentSentiment(default, Enum.Parse<TextSentiment>(expectedSentiment), 1.0, null));

            textAnalyticsClientMock
                .Setup(client => client.AnalyzeSentimentAsync(inputText, It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(responseMock.Object);

            // Act
            var result = await textAnalytics.AnalyzeSentimentAsync(inputText);

            // Assert
            Assert.That(result, Is.EqualTo(expectedSentiment));
            textAnalyticsClientMock.Verify(client => client.AnalyzeSentimentAsync(inputText, null, It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test]
        public async Task AnalyzeSentimentAsync_RequestFailedException_ReturnsUnknown()
        {
            // Arrange
            var inputText = "This input will trigger an error.";
            var exception = new RequestFailedException(500, "Simulated failure");
            textAnalyticsClientMock
                .Setup(client => client.AnalyzeSentimentAsync(inputText, It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ThrowsAsync(exception);

            // Act
            var result = await textAnalytics.AnalyzeSentimentAsync(inputText);

            // Assert
            Assert.That(result, Is.EqualTo("Unknown"));
            textAnalyticsClientMock.Verify(client => client.AnalyzeSentimentAsync(inputText, null, It.IsAny<CancellationToken>()), Times.Once);
            loggerMock.Verify(logger => logger.LogError(exception, It.Is<string>(msg => msg.Contains("Error analyzing sentiment"))), Times.Once);
        }
    }
}