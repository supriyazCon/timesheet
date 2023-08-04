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

        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Client> Client { get; set; }
        public DbSet<Designation> Designation { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectUsers> ProjectUser { get; set; }
        public DbSet<Tasks> Task { get; set; }
        public DbSet<TaskAssign> TaskAssign { get; set; }
        public DbSet<ProjectTask> TaskProject { get; set; }
        public DbSet<TimeSheet> TimeSheet { get; set; }
        public DbSet<Currency> Currency { get; set; }
        public DbSet<BillingMethod> BillingMethod { get; set; }
        public DbSet<DeliveryManager> DeliveryManager { get; set; }
        public DbSet<ProjectManager> ProjectManager { get; set; }
        public DbSet<Country> Country { get; set; }





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
          //builder.Entity<CommonEntity>().HasQueryFilter(e => !e.IsDeleted);

            

        }

       /* public override int  SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                var entity = entry.Entity;

                if(entry.State == EntityState.Deleted)
                {
                    entry.State = EntityState.Modified;


                    entity.GetType().GetProperty("IsDeleted").SetValue(entity, 'D');
                }
            }

            return base.SaveChanges();
        }*/


    }
}
