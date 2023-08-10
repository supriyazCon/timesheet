using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public class SQLDailyLogRepository
    {
        private readonly JobDbContext dbContext;

        public SQLDailyLogRepository(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<DailyLog> CreateAsync(DailyLog DailyLog)
        {
           /* DailyLog.CreatedDate = DateTime.Now;
            DailyLog.UpdatedDate = DateTime.Now;*/
            await dbContext.DailyLog.AddAsync(DailyLog);
            await dbContext.SaveChangesAsync();
            return DailyLog;
        }
    }
}
