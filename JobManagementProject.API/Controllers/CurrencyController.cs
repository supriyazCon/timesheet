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
    [Route("api/currency")]
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

       /* // GET api/currency/1
        [HttpGet("{id}")]
        public IActionResult GetCurrency(int id)
        {
            var currency = dbContext.Currencies.FirstOrDefault(c => c.CurrencyId == id);
            if (currency == null)
                return NotFound();

            return Ok(currency);
        }*/

       
    }
}
