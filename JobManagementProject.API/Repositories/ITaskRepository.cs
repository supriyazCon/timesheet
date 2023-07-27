using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;

namespace JobManagementProject.API.Repositories
{
    public interface ITaskRepository
    {
        Task<Tasks> CreateAsync(Tasks task);
        Task<TaskProject> CreateTaskProjectAsync(TaskProject taskProject);
        Task<List<Tasks>> GetAllAsync();
        Task<List<TaskProject>> GetAllTaskProjectAsync(string? filterOn = null, string? filterQuery = null/*,
            string? sortBy = null, bool isAscending = true*/);
        Task<Tasks?> UpdateAsync(Guid id, Tasks task);
        Task<Tasks?> DeleteAsync(Guid id);
        Task<TaskProject> DeleteTaskProjectAsync(string job);


    }
}
