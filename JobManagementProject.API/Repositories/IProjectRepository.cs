using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface IProjectRepository
    {
       Task<Project> CreateAsync(Project project);
       Task<List<Project>> GetAllAsync();
       Task<Project?> GetByIdAsync(Guid id);
       Task<Project?> UpdateAsync(Guid id, Project project);
       Task<Project?> DeleteAsync(Guid id);
    }

}
