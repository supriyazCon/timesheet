using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Repositories
{
    public class SQLTimeSheetRepository : ITimeSheetRepository
    {
        private readonly JobDbContext dbContext;

        public SQLTimeSheetRepository(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<TimeSheets> CreateAsync(TimeSheets timeSheets)
        {
            timeSheets.CreatedDate = DateTime.Now;
            timeSheets.UpdatedDate = DateTime.Now;
            await dbContext.TimeSheets.AddAsync(timeSheets);
            await dbContext.SaveChangesAsync();
            return timeSheets;
        }

        public async Task<TimeSheets?> DeleteAsync(Guid id)
        {
            var existingTimesheets = await dbContext.TimeSheets.FirstOrDefaultAsync(x => x.Id == id);  
            
            if (existingTimesheets == null)
            {
                return null;
            }

            dbContext.TimeSheets.Remove(existingTimesheets);
            await dbContext.SaveChangesAsync();
            return existingTimesheets;
        }

        public async Task<List<TimeSheets>> GetAllAsync()
        {
            return await dbContext.TimeSheets.ToListAsync();
        }

        public async Task<TimeSheets> GetByDateAsync(DateTime date)
        {
            return await dbContext.TimeSheets.FirstOrDefaultAsync(x => x.CreatedDate == date); 
        }

        public async Task<TimeSheets?> UpdateAsync(Guid id, TimeSheets timeSheets)
        {
            var existingTimeSheets = await dbContext.TimeSheets.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTimeSheets == null)
            {
                return null;
            }

            existingTimeSheets.ProjectName = timeSheets.ProjectName;
            existingTimeSheets.TaskName = timeSheets.TaskName;
            existingTimeSheets.Description = timeSheets.Description;
            existingTimeSheets.TotalHours = timeSheets.TotalHours;

            await dbContext.SaveChangesAsync();

            return existingTimeSheets;

        }
    }
}
