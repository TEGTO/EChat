using Microsoft.EntityFrameworkCore;

namespace ChatApi.Data
{
    public class MessageDbContext : DbContext
    {
        public virtual DbSet<MessageEntity> Messages { get; set; }

        public MessageDbContext(DbContextOptions options) : base(options)
        {
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<MessageEntity>();
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
