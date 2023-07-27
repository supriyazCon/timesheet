//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;

//namespace JobManagementProject.API.Data
//{
//    public class JobAuthDbContext : IdentityDbContext<IdentityUser>
//    {
//        public JobAuthDbContext(DbContextOptions<JobAuthDbContext> options) : base(options) 
//        {
//        }

//        protected override void OnModelCreating(ModelBuilder builder)
//        {
//            base.OnModelCreating(builder);

//            var readerRoleId = "04c82129-a393-43df-b7fd-bcba6273f99e";
//            var WriterRoleId = "408f1e13-3d19-4a10-8a4c-54d7ac97fc1b";

//            var roles = new List<IdentityRole>
//            {
//                new IdentityRole
//                {
//                    Id = readerRoleId,
//                    ConcurrencyStamp = readerRoleId,
//                    Name = "Reader",
//                    NormalizedName = "Reader".ToUpper()
//                },

//                new IdentityRole
//                {
//                    Id = WriterRoleId,
//                    ConcurrencyStamp = WriterRoleId,
//                    Name = "Writer",
//                    NormalizedName = "Writer".ToUpper()
//                }
//            };

//            builder.Entity<IdentityRole>().HasData(roles);
//        }
//    }
//}
