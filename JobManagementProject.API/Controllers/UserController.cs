using JobManagementProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly JobDbContext dbContext;

        public UserController(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }



        [HttpGet("deliverymanager")]
        public IActionResult GetALL()
        {
            var deliveryManager = dbContext.DeliveryManager.ToList();
            return Ok(deliveryManager);
        }


        [HttpGet("projectmanager")]
        public IActionResult GetAll()
        {
            var projectmanager = dbContext.ProjectManager.ToList();
            return Ok(projectmanager);
        }
    }
}
