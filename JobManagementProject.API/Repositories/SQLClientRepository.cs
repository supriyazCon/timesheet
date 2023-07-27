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

        public async Task<Clients> CreateAsync(Clients Client)
        {
            Client.CreatedDate = DateTime.Now;
            Client.UpdatedDate = DateTime.Now;
            await dbContext.Clients.AddAsync(Client);
            await dbContext.SaveChangesAsync();
            return Client;
        }

        public async Task<Clients?> DeleteAsync(Guid id)
        {
            var existingclient = await dbContext.Clients.FirstOrDefaultAsync(x => x.ClientId == id);

            if (existingclient == null) 
            {
                return null;
            }

            dbContext.Clients.Remove(existingclient);
            await dbContext.SaveChangesAsync();
            return existingclient;
        }

        public async Task<List<Clients>> GetAllAsync()
        {
           return await dbContext.Clients.ToListAsync();
        }

        public async Task<Clients?> GetByIdAsync(Guid id)
        {
            return await dbContext.Clients.FirstOrDefaultAsync(x => x.ClientId == id);
        }

        public async Task<Clients?> UpdateAsync(Guid id, Clients Client)
        {
            var existingClient = await dbContext.Clients.FirstOrDefaultAsync(x => x.ClientId == id);
            
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
