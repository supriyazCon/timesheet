using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Repositories
{
    public class SQLClientRepository : IClientRepository
    {
        private readonly JobDbContext dbContext;

        public SQLClientRepository(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Client> CreateAsync(Client Client)
        {
            Client.CreatedDate = DateTime.Now;
            Client.UpdatedDate = DateTime.Now;
            await dbContext.Client.AddAsync(Client);
            await dbContext.SaveChangesAsync();
            return Client;
        }

        public async Task<Client?> DeleteAsync(Guid id)
        {
            var existingclient = await dbContext.Client.FirstOrDefaultAsync(x => x.ClientId == id);

            if (existingclient == null) 
            {
                return null;
            }

            existingclient.IsDeleted = true;

            dbContext.Client.Update(existingclient);
            await dbContext.SaveChangesAsync();
            return existingclient;
        }

        public async Task<List<Client>> GetAllAsync()
        {
           return await dbContext.Client.ToListAsync();
        }

        public async Task<Client?> GetByIdAsync(Guid id)
        {
            return await dbContext.Client.FirstOrDefaultAsync(x => x.ClientId == id);
        }

        public async Task<Client?> UpdateAsync(Guid id, Client Client)
        {
            var existingClient = await dbContext.Client.FirstOrDefaultAsync(x => x.ClientId == id);
            
            if (existingClient == null)
            {
                return null;
            }

            existingClient.ClientName = Client.ClientName;
            existingClient.CurrencyId = Client.CurrencyId;
            existingClient.BillingMethodId = Client.BillingMethodId;
            existingClient.EmailId = Client.EmailId;
            existingClient.FirstName = Client.FirstName;
            existingClient.LastName = Client.LastName;
            existingClient.Phone = Client.Phone;
            existingClient.Mobile = Client.Mobile;
            existingClient.Fax = Client.Fax;

            await dbContext.SaveChangesAsync();

            return existingClient;

        }
    }
}
