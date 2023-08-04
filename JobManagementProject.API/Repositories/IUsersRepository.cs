using JobManagementProject.API.Models.Domain;

namespace JobManagementProject.API.Repositories
{
    public interface IUsersRepository
    {
        Task<List<User>> GetAllAsync();

        Task<User> CreateAsync(User users);
    }
}
