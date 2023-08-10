using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyLogController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IDailyLogRepository dailyLogRepository;

        public DailyLogController(IMapper mapper, IDailyLogRepository dailyLogRepository)
        {
            this.mapper = mapper;
            this.dailyLogRepository = dailyLogRepository;
        }



        // Get All DailyLog
        // GET : /api/DailyLog
        [HttpGet]
        //[Authorize(Roles = "ProjectManager, DeliveryManager")]
        public async Task<IActionResult> GetAll()
        {
            var daliyLogDomainModel = await dailyLogRepository.GetAllAsync();

            //Map Domain MOdel to DTO
            return Ok(mapper.Map<List<ProjectDto>>(daliyLogDomainModel));
        }



        //Create DalilyLog
        // POST : /api/dailylog
        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddDailyLogRequestDto addDailyLogRequestDto)
        {

            var daliyLogDomainModel = mapper.Map<DailyLog>(addDailyLogRequestDto);

            await dailyLogRepository.CreateAsync(daliyLogDomainModel);

            // Map Domain Model To DTO
            return Ok(mapper.Map<DailyLogDto>(daliyLogDomainModel));
        }

        //Update DalilyLog
        // PUT : /api/dailylog
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateDailyLogRequestDto updateDailyLogRequestDto)
        {
            var daliyLogDomainModel = mapper.Map<DailyLog>(updateDailyLogRequestDto);

            daliyLogDomainModel = await dailyLogRepository.UpdateAsync(id, daliyLogDomainModel);

            if (daliyLogDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model To DTO
            return Ok(mapper.Map<DailyLogDto>(daliyLogDomainModel));
        }
    }
}
