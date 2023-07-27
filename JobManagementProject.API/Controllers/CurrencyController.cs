using AutoMapper;
using JobManagementProject.API.Data;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace JobManagementProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly JobDbContext dbContext;

        public CurrencyController(IMapper mapper, JobDbContext dbContext)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetCurrencies()
        {
            var currencies = dbContext.Currencies.ToList();
            return Ok(currencies);
        }

        // GET api/currency/1
        [HttpGet("{id}")]
        public IActionResult GetCurrency(int id)
        {
            var currency = dbContext.Currencies.FirstOrDefault(c => c.CurrencyId == id);
            if (currency == null)
                return NotFound();

            return Ok(currency);
        }

        private string GenerateCurrencyCode()
        {
            // List of available currency codes
            string[] currencyCodes = { "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "SGD", "NZD" };

            // Generate a random index to pick a currency code from the list
            Random random = new Random();
            int randomIndex = random.Next(0, currencyCodes.Length);

            // Return the randomly picked currency code
            return currencyCodes[randomIndex];
        }
    }
}
