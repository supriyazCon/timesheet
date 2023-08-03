using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface IUsersRepository
    {
        Task<List<Users>> GetAllAsync();

        Task<Users> CreateAsync(Users users);
    }
}
