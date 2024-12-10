using Azure;
using Azure.AI.TextAnalytics;

namespace ChatApi.Services
{
    public class TextAnalytics : ITextAnalytics
    {
        private readonly TextAnalyticsClient textAnalyticsClient;
        private readonly ILogger<TextAnalytics> logger;

        public TextAnalytics(TextAnalyticsClient textAnalyticsClient, ILogger<TextAnalytics> logger)
        {
            this.textAnalyticsClient = textAnalyticsClient;
            this.logger = logger;
        }

        public async Task<string> AnalyzeSentimentAsync(string text, CancellationToken cancellationToken = default)
        {
            try
            {
                var sentimentAnalysis = await textAnalyticsClient.AnalyzeSentimentAsync(text, cancellationToken: cancellationToken);
                return sentimentAnalysis.Value.Sentiment.ToString(); // "Positive", "Neutral", or "Negative"
            }
            catch (RequestFailedException ex)
            {
                var message = $"Error analyzing sentiment: {ex.Message}";
                logger.LogError(ex, message);

                return "Unknown";
            }
        }
    }
}
