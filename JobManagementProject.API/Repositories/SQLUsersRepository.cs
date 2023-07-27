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

        public async Task<Users> CreateAsync(Users users)
        {
            users.CreatedDate = DateTime.Now;
            users.UpdatedDate = DateTime.Now;
            await dbContext.Users.AddAsync(users);
            await dbContext.SaveChangesAsync();
            return users;
        }

        public async Task<List<Users>> GetAllAsync()
        {
           return await dbContext.Users.ToListAsync();
        }
    }
}
