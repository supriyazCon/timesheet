using JobManagementProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    [Route("api/master")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private readonly JobDbContext dbContext;

        public MasterController(JobDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("billing")]
        public IActionResult GetBilling()
        {
            var billingMethod = dbContext.BillingMethod.ToList();
            return Ok(billingMethod);
        }

        [HttpGet("currency")]
        public IActionResult GetCurrencies()
        {
            var currencies = dbContext.Currency.ToList();
            return Ok(currencies);
        }


        [HttpGet("country")]
        public IActionResult GetCountry()
        {
            var country = dbContext.Country.ToList();
            return Ok(country);
        }
    }
}
