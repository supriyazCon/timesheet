using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Repositories
{
    public class SQLUsersRepository : IUsersRepository
    {
        private readonly JobDbContext dbContext;

        public SQLUsersRepository(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<User> CreateAsync(User users)
        {
            users.CreatedDate = DateTime.Now;
            users.UpdatedDate = DateTime.Now;
            await dbContext.User.AddAsync(users);
            await dbContext.SaveChangesAsync();
            return users;
        }

        public async Task<List<User>> GetAllAsync()
        {
           return await dbContext.User.ToListAsync();
        }
    }
}
