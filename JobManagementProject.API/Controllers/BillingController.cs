using JobManagementProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Controllers
{
    [Route("api/billingmethod")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly JobDbContext jobDbContext;

        public BillingController(JobDbContext jobDbContext)
        {
            this.jobDbContext = jobDbContext;
        }

        [HttpGet]
        public IActionResult GetBilling() 
        {
            var billingMethod = jobDbContext.BillingMethods.ToList();
            return Ok(billingMethod);
        }
    }
}
