using JobManagementProject.API.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Data
{
    public class JobDbContext : IdentityDbContext<IdentityUser>
    {

        public JobDbContext(DbContextOptions<JobDbContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Clients> Clients { get; set; }
        public DbSet<Designations> Designations { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectUsers> ProjectUsers { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<TaskAssign> TaskAssigns { get; set; }
        public DbSet<TaskProject> TaskProject { get; set; }
        public DbSet<TimeSheets> TimeSheets { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        //public DbSet<BillingMethod> BillingMethods { get; set; }


        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var ProjectManagerId = "04c82129-a393-43df-b7fd-bcba6273f99e";
            var DeliveryManagerId = "408f1e13-3d19-4a10-8a4c-54d7ac97fc1b";
            var GenericUserId = "f0488c17-668e-4e75-8c22-41c3c0781107";

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = ProjectManagerId,
                    ConcurrencyStamp = ProjectManagerId,
                    Name = "ProjectManager",
                    NormalizedName = "PROJECTMANAGER".ToUpper()
                },

                new IdentityRole
                {
                    Id = DeliveryManagerId,
                    ConcurrencyStamp = DeliveryManagerId,
                    Name = "DeliveryManager",
                    NormalizedName = "DEILEVERYMANAGER".ToUpper()
                },

                new IdentityRole
                {
                    Id = GenericUserId,
                    ConcurrencyStamp = GenericUserId,
                    Name = "GenericUser",
                    NormalizedName = "GENRICUSER".ToUpper()
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);




            var currencies = new List<Currency>
            {
                new Currency { CurrencyCode = "USD", CurrencyId = 100, NormalizedName = "USD".ToUpper()},
                new Currency { CurrencyCode = "EUR", CurrencyId = 200, NormalizedName = "EUR".ToUpper()},
                new Currency { CurrencyCode = "JPY", CurrencyId = 300, NormalizedName = "JPY".ToUpper()},
              
               // Add more currencies as needed
            };
        }




    }
}
