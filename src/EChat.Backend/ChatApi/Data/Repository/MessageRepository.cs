using DatabaseControl.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ChatApi.Data.Repository
{
    public class MessageRepository : IMessageRepository
    {
        protected readonly IDatabaseRepository<MessageDbContext> repository;

        public MessageRepository(IDatabaseRepository<MessageDbContext> repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<MessageEntity>> GetMessagesAsync(CancellationToken cancellationToken = default)
        {
            var queryable = await repository.GetQueryableAsync<MessageEntity>(cancellationToken);

            return await queryable.OrderBy(x => x.CreatedAt).ToListAsync(cancellationToken);
        }

        public async Task AddMessageAsync(MessageEntity message, CancellationToken cancellationToken = default)
        {
            await repository.AddAsync(message, cancellationToken);
        }
    }
}
