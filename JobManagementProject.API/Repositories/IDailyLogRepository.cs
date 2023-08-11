using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface IDailyLogRepository
    {
        Task<List<DailyLog>> GetAllAsync();
        Task<DailyLog> CreateAsync(DailyLog DailyLog);
        Task<DailyLog?> UpdateAsync(Guid id, DailyLog DailyLog);
        Task<DailyLog?> DeleteAsync(Guid id);
    }
}
