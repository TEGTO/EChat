using Microsoft.EntityFrameworkCore;

namespace ChatApi.Data
{
    public class MessageDbContext : DbContext
    {
        public virtual DbSet<MessageEntity> Messages { get; set; }

        public MessageDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
