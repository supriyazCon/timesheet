using JobManagementProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    [Route("api/projectmanager")]
    [ApiController]
    public class ProjectMangerController : ControllerBase
    {
        private readonly JobDbContext dbContext;

        public ProjectMangerController(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll() 
        {
            var projectmanager = dbContext.ProjectManager.ToList();
            return Ok(projectmanager);
        }


    }
}
