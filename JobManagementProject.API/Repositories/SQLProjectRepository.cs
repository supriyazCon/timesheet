using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Repositories
{
    public class SQLProjectRepository : IProjectRepository
    {
        private readonly JobDbContext dbContext;

        public SQLProjectRepository(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Project> CreateAsync(Project project)
        {
            project.CreatedDate = DateTime.Now;
            project.UpdatedDate = DateTime.Now;
            await dbContext.Project.AddAsync(project);
            await dbContext.SaveChangesAsync(); 
            return project;
        }

        public async Task<Project?> DeleteAsync(Guid id)
        {
            var existingProject = await dbContext.Project.FirstOrDefaultAsync(x => x.ProjectId == id);

            if (existingProject == null)
            {
                return null;
            }

            existingProject.IsDeleted = true;

            dbContext.Project.Update(existingProject);
            await dbContext.SaveChangesAsync();
            return existingProject;
        }

        public async Task<List<Project>> GetAllAsync()
        {
            return await dbContext.Project.ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(Guid id)
        {
            return await dbContext.Project.FirstOrDefaultAsync(x => x.ProjectId == id);

        }

        public async Task<Project?> UpdateAsync(Guid id, Project project)
        {
            var existingproject = await dbContext.Project.FirstOrDefaultAsync(x => x.ProjectId == id);

            if (existingproject == null)
            {
                return null;
            }

            existingproject.ProjectName = project.ProjectName;
            existingproject.ProjectCost = project.ProjectCost;
            existingproject.DeliveryManagerId = project.DeliveryManagerId;
            existingproject.ProjectManagerId = project.ProjectManagerId;
            existingproject.Description = project.Description;

            await dbContext.SaveChangesAsync();
            return existingproject;
        }
    }
}
