using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    [Route("api/log")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IDailyLogRepository dailyLogRepository;

        public LogController(IMapper mapper, IDailyLogRepository dailyLogRepository)
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
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]
        public async Task<IActionResult> Create([FromBody] AddLogRequestDto addDailyLogRequestDto)
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
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]
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



        // Delete a Client By Id
        // DELETE : /api/clients/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deleteddaliyLogDomainModel = await dailyLogRepository.DeleteAsync(id);

            if (deleteddaliyLogDomainModel == null)
            {
                return NotFound();
            }



            // Map Domain Model to DTO
            return Ok(mapper.Map<ClientDto>(deleteddaliyLogDomainModel));
        }
    }
}
