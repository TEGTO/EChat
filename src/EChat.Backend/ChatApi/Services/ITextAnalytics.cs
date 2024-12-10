
namespace ChatApi.Services
{
    public interface ITextAnalytics
    {
        public Task<string> AnalyzeSentimentAsync(string text, CancellationToken cancellationToken = default);
    }
}