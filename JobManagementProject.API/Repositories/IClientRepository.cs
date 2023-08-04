using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface IClientRepository
    {
       Task<Client> CreateAsync(Client Client);
       Task<List<Client>> GetAllAsync();
       Task<Client?> GetByIdAsync(Guid id);
       Task<Client?> UpdateAsync(Guid id, Client Client);
       Task<Client?> DeleteAsync(Guid id);
    }
}
