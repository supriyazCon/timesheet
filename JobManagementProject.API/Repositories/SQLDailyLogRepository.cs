using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Repositories
{
    public class SQLDailyLogRepository : IDailyLogRepository
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

        public async Task<DailyLog?> DeleteAsync(Guid id)
        {

            var existingDailyLog = await dbContext.DailyLog.FirstOrDefaultAsync(x => x.UserId ==id);


            if (existingDailyLog == null)
            {
                return null;
            }

            existingDailyLog.IsDeleted = false;

            dbContext.DailyLog.Remove(existingDailyLog);
            await dbContext.SaveChangesAsync();
            return existingDailyLog;

        }

        public async Task<List<DailyLog>> GetAllAsync()
        {
            return await dbContext.DailyLog.Where(x => !x.IsDeleted).ToListAsync();
        }

        public async Task<DailyLog?> UpdateAsync(Guid id, DailyLog DailyLog)
        {
            var existingDailyLog = await dbContext.DailyLog.FirstOrDefaultAsync(x => x.UserId == id);
               

            if (existingDailyLog == null)
            {
                return null;
            }

            existingDailyLog.ProjectName = DailyLog.ProjectName;
            existingDailyLog.TaskName = DailyLog.TaskName;
            existingDailyLog.Description = DailyLog.Description;
            existingDailyLog.Hours = DailyLog.Hours;
            existingDailyLog.Minutes = DailyLog.Minutes;

            await dbContext.SaveChangesAsync();

            return existingDailyLog;
        }
    }
}
