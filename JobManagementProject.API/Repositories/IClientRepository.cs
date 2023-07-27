using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface IClientRepository
    {
       Task<Clients> CreateAsync(Clients Client);
       Task<List<Clients>> GetAllAsync();
       Task<Clients?> GetByIdAsync(Guid id);
       Task<Clients?> UpdateAsync(Guid id, Clients Client);
       Task<Clients?> DeleteAsync(Guid id);
    }
}
