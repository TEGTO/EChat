using Microsoft.EntityFrameworkCore;

namespace DatabaseControl.Repositories
{
    public class DatabaseRepository<TContext> : IDatabaseRepository<TContext> where TContext : DbContext
    {
        private readonly IDbContextFactory<TContext> dbContextFactory;

        public DatabaseRepository(IDbContextFactory<TContext> dbContextFactory)
        {
            this.dbContextFactory = dbContextFactory;
        }

        #region IDatabaseRepository Members

        public async Task MigrateDatabaseAsync(CancellationToken cancellationToken)
        {
            var dbContext = await CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
            await dbContext.Database.MigrateAsync(cancellationToken).ConfigureAwait(false);
        }

        public async Task<T> AddAsync<T>(T obj, CancellationToken cancellationToken) where T : class
        {
            var dbContext = await CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
            await dbContext.AddAsync(obj, cancellationToken).ConfigureAwait(false);
            await dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            return obj;
        }

        public async Task<IQueryable<T>> GetQueryableAsync<T>(CancellationToken cancellationToken) where T : class
        {
            var dbContext = await CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
            return dbContext.Set<T>().AsQueryable();
        }

        public async Task<T> UpdateAsync<T>(T obj, CancellationToken cancellationToken) where T : class
        {
            var dbContext = await CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
            dbContext.Update(obj);
            await dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            return obj;
        }

        public async Task UpdateRangeAsync<T>(IEnumerable<T> obj, CancellationToken cancellationToken) where T : class
        {
            var dbContext = await CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
            dbContext.UpdateRange(obj);
            await dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        }

        public async Task DeleteAsync<T>(T obj, CancellationToken cancellationToken) where T : class
        {
            var dbContext = await CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
            dbContext.Remove(obj);
            await dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        }

        #endregion

        #region Protected Helpers

        protected async Task<TContext> CreateDbContextAsync(CancellationToken cancellationToken)
        {
            return await dbContextFactory.CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
        }

        #endregion
    }
}
