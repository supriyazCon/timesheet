using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Repositories
{
    public class SQLTaskRepository : ITaskRepository
    {
        private readonly JobDbContext dbContext;

        public SQLTaskRepository(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Tasks> CreateAsync(Tasks task)
        {

            await dbContext.Task.AddAsync(task);
            await dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<ProjectTask> CreateTaskProjectAsync(ProjectTask taskProject)
        {
            await dbContext.TaskProject.AddAsync(taskProject);
            await dbContext.SaveChangesAsync();
            return taskProject;
        }

        public async Task<Tasks?> DeleteAsync(Guid id)
        {
            var existingTask = await dbContext.Task.FirstOrDefaultAsync(x => x.TaskId == id);

            if (existingTask == null)
            {
                return null;
            }


            existingTask.IsDeleted = true;

            dbContext.Task.Remove(existingTask);
            await dbContext.SaveChangesAsync();
            return existingTask;

        }

        public async Task<ProjectTask> DeleteTaskProjectAsync(string job)
        {
            var existingProjectTask = await dbContext.TaskProject.FirstOrDefaultAsync(x => x.JobName == job);

            if (existingProjectTask == null)
            {
                return null;
            }

            dbContext.TaskProject.Remove(existingProjectTask);
            await dbContext.SaveChangesAsync();
            return existingProjectTask;
        }

        public async Task<List<Tasks>> GetAllAsync()
        {
            return await dbContext.Task.Where(x => !x.IsDeleted).ToListAsync();
        }

        public async Task<List<ProjectTask>> GetAllTaskProjectAsync(string? filterOn = null, string? filterQuery = null/*,
            string? sortBy = null, bool isAscending = true*/)
        {
            var taskProject = dbContext.TaskProject.AsQueryable();

            // Fltering
            if(string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("JobName", StringComparison.OrdinalIgnoreCase))
                {

                    taskProject = taskProject.Where(x => x.JobName.Contains(filterQuery));
                }
                else if (filterOn.Equals("Project", StringComparison.OrdinalIgnoreCase))
                {
                    taskProject = taskProject.Where(x => x.Project.Contains(filterQuery));
                }
            }

            // Sorting
           /* if(string.IsNullOrWhiteSpace(sortBy) == false)
            {
                if (sortBy.Equals("JobName", StringComparison.OrdinalIgnoreCase) )
                {
                    taskProject = isAscending ? taskProject.OrderBy(x => x.JobName): taskProject.OrderByDescending(x => x.JobName);
                }
                else if (sortBy.Equals("Project", StringComparison.OrdinalIgnoreCase))
                {
                    taskProject = isAscending ? taskProject.OrderBy(x => x.Project) : taskProject.OrderByDescending(x => x.Project);
                }
            }*/


            return await taskProject.ToListAsync();

            // return await dbContext.TaskProject.ToListAsync();

        }

        public async Task<Tasks?> UpdateAsync(Guid id, Models.Domain.Tasks task)
        {
            var existingTask = await dbContext.Task.FirstOrDefaultAsync(x => x.TaskId == id);

            if (existingTask == null)
            {
                return null;
            }

            existingTask.TaskName = task.TaskName;
            existingTask.ProjectId = task.ProjectId;

            await dbContext.SaveChangesAsync();

            return existingTask;
        }
    }
}
