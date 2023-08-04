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

        public async Task<TimeSheet> CreateAsync(TimeSheet timeSheets)
        {
            timeSheets.CreatedDate = DateTime.Now;
            timeSheets.UpdatedDate = DateTime.Now;
            await dbContext.TimeSheet.AddAsync(timeSheets);
            await dbContext.SaveChangesAsync();
            return timeSheets;
        }

        public async Task<TimeSheet?> DeleteAsync(Guid id)
        {
            var existingTimesheets = await dbContext.TimeSheet.FirstOrDefaultAsync(x => x.Id == id);  
            
            if (existingTimesheets == null)
            {
                return null;
            }

            existingTimesheets.IsDeleted = true;

            dbContext.TimeSheet.Update(existingTimesheets);

            dbContext.TimeSheet.Remove(existingTimesheets);
            await dbContext.SaveChangesAsync();
            return existingTimesheets;
        }

        public async Task<List<TimeSheet>> GetAllAsync()
        {
            return await dbContext.TimeSheet.ToListAsync();
        }

        public async Task<TimeSheet> GetByDateAsync(DateTime date)
        {
            return await dbContext.TimeSheet.FirstOrDefaultAsync(x => x.CreatedDate == date); 
        }

        public async Task<TimeSheet?> UpdateAsync(Guid id, TimeSheet timeSheets)
        {
            var existingTimeSheets = await dbContext.TimeSheet.FirstOrDefaultAsync(x => x.Id == id);

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
