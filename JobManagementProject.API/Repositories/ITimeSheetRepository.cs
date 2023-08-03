using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface ITimeSheetRepository
    {
        Task<TimeSheets> CreateAsync(TimeSheets timeSheets);
        Task<List<TimeSheets>> GetAllAsync();
        Task<TimeSheets> GetByDateAsync(DateTime date);
        Task<TimeSheets?> UpdateAsync(Guid id, TimeSheets timeSheets);
        Task<TimeSheets?> DeleteAsync(Guid id);
    }
}
