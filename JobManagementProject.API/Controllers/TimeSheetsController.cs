using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    [Route("api/timesheet")]
    [ApiController]
    public class TimeSheetsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ITimeSheetRepository timeSheetRepository;

        public TimeSheetsController(IMapper mapper, ITimeSheetRepository timeSheetRepository)
        {
            this.mapper = mapper;
            this.timeSheetRepository = timeSheetRepository;
        }


        // Get Daily TimeSheets
        // CET : /api/timesheets
        [HttpGet]
        //[Authorize(Roles = "GenericUser)]
        public async Task<IActionResult> GetAll()
        {
            var timeSheetDomainModel = await timeSheetRepository.GetAllAsync();

            // Map Domain Model To DTO
            return Ok(mapper.Map<List<TimeSheetDto>>(timeSheetDomainModel));


        }


        // Get Daily TimeSheets By Date
        // GET : /api/timesheet/{Date}
        [HttpGet]
        [Route("{date:DateTime}")]
        //[Authorize(Roles = "GenericUser")]
        public async Task<IActionResult> GetByDate([FromRoute] DateTime date)
        {

            var timeSheetDomainModel = await timeSheetRepository.GetByDateAsync(date);

            if (timeSheetDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model to DTO

            return Ok(mapper.Map<TimeSheetDto>(timeSheetDomainModel));

        }




        // Create TimeSheets
        // POST: /api/timesheets
        [HttpPost]
        //[Authorize(Roles = "GenericUser")]
        public async Task<IActionResult> Create([FromBody] AddTimeSheetRequestDto addTimeSheetRequestDto)
        {
            // Map DTo to Domain Model 
           var TimeSheetDomainModel = mapper.Map<TimeSheet>(addTimeSheetRequestDto);

           await timeSheetRepository.CreateAsync(TimeSheetDomainModel);

            // Map Domain Model to DTO
            return Ok(mapper.Map<TimeSheetDto>(TimeSheetDomainModel));
        }



        // Update TimeSheets By ID
        // UPDATE : /api/timesheet/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "GenericUser")]
        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateTimeSheetRequestDto updateTimeSheetRequestDto)
        {
            // Map DTO to Domain Model
            var timeSheetDomainModel = mapper.Map<TimeSheet>(updateTimeSheetRequestDto);

            timeSheetDomainModel = await timeSheetRepository.UpdateAsync(id, timeSheetDomainModel);

            if (timeSheetDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<TimeSheetDto>(timeSheetDomainModel));
        }


        // Delete A TimeSheet by ID
        // DELETE : /api/timesheets/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "GenericUser")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deleteTimeSheetDomainModel = await timeSheetRepository.DeleteAsync(id);

            if (deleteTimeSheetDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<TimeSheetDto>(deleteTimeSheetDomainModel));
        }
    }
}
