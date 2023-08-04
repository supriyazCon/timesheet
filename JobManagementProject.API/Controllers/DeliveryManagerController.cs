using JobManagementProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    [Route("api/deliverymanager")]
    [ApiController]
    public class DeliveryManagerController : ControllerBase
    {
        private readonly JobDbContext dbContext;

        public DeliveryManagerController(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpGet]
        public IActionResult GetALL()
        {
            var deliveryManager = dbContext.DeliveryManager.ToList();
            return Ok(deliveryManager);
        }
    }
}
