
namespace ChatApi.Data.Repository
{
    public interface IMessageRepository
    {
        public Task AddMessageAsync(MessageEntity message, CancellationToken cancellationToken = default);
        public Task<IEnumerable<MessageEntity>> GetMessagesAsync(CancellationToken cancellationToken = default);
    }
}