using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface ITimeSheetRepository
    {
        Task<TimeSheet> CreateAsync(TimeSheet timeSheets);
        Task<List<TimeSheet>> GetAllAsync();
        Task<TimeSheet> GetByDateAsync(DateTime date);
        Task<TimeSheet?> UpdateAsync(Guid id, TimeSheet timeSheets);
        Task<TimeSheet?> DeleteAsync(Guid id);
    }
}
