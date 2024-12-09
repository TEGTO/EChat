
namespace ChatApi.Data.Repository
{
    public interface IMessageRepository
    {
        public Task AddMessageAsync(MessageEntity message, CancellationToken cancellationToken);
        public Task<IEnumerable<MessageEntity>> GetMessagesAsync(CancellationToken cancellationToken);
    }
}