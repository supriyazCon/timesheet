using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    // api/task
    [Route("api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ITaskRepository taskRepository;

        public TaskController(IMapper mapper, ITaskRepository taskRepository)
        {
            this.mapper = mapper;
            this.taskRepository = taskRepository;
        }


        // Get All Task
        // GET : /api/all task
        [HttpGet]
        //[Authorize(Roles = "ProjectManager, DeliveryManager")]

        public async Task<IActionResult> GetAll()
        {
            var tasksDomainModel = await taskRepository.GetAllAsync();

            // Map Domain Model to DTO
            return Ok(mapper.Map<List<TaskDto>>(tasksDomainModel));

        }

        // Get All Task Project
        // GET : /api/task project?filteronJobNAme&Project&filterquery=Track&&sortBy=Name&ProjectisAccending=true
        [HttpGet("api/taskproject")]
        //[Authorize(Roles = "ProjectManager, DeliveryManager")]

        public async Task<IActionResult> GetAllTaskProject([FromQuery] string? filterOn, [FromQuery] string? filterQuery
            /*,[FromQuery] string? sortBy, [FromQuery] bool? isAscending*/)
        {
            var taskProjectkDomainModel = await taskRepository.GetAllTaskProjectAsync(filterOn, filterQuery/*, sortBy, isAscending ?? true*/);

            // Map Domain Model to DTO
            return Ok(mapper.Map<List<ProjectTaskDto>>(taskProjectkDomainModel));
        }



        // Create Task
        // POST : /api/task

        [HttpPost]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]
        public async Task<IActionResult> Create([FromBody] AddTaskRequestDto addTaskRequestDto)
        {
            // Map DTO to Domain Model
            var taskDomainModel = mapper.Map<Models.Domain.Tasks>(addTaskRequestDto);

            await taskRepository.CreateAsync(taskDomainModel);

            // Map Domain Model to DTO

            return Ok(mapper.Map<TaskDto>(taskDomainModel));

           
        }


        // Create Task Project
        // POST : /api/taskproject
        [HttpPost("api/taskproject")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> CreateTaskProject([FromBody] AddProjectTaskRequestDto addTaskProjectRequestDto)
        {
            // Map DTO to Domain Model
            var tasProjectkDomainModel = mapper.Map<ProjectTask>(addTaskProjectRequestDto);
            
           
            await taskRepository.CreateTaskProjectAsync(tasProjectkDomainModel);

            // Map Domain Model to DTO

            return Ok(mapper.Map<ProjectTaskDto>(tasProjectkDomainModel));


        }


        // Update A Task by Id
        // PUT : /api/task/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateTaskRequestDto updateTaskRequestDto)
        {
            var taskDomainModel = mapper.Map<Tasks>(updateTaskRequestDto);

            await taskRepository.UpdateAsync(id, taskDomainModel);

            if (taskDomainModel == null)
            {
                return NotFound();
            }

            //Map Domain Model to DTO
            return Ok(mapper.Map<TaskDto>(taskDomainModel));
        }


        // Delete A Task by Id
        // DELETE : /api/task/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedTaskDomainModel = await taskRepository.DeleteAsync(id);

            if (deletedTaskDomainModel == null)
            {
                return NotFound();
            }

            // Map DOmain Model to DTO
            return Ok(mapper.Map<TaskDto>(deletedTaskDomainModel));
        }


        // Delete A Task by JobNAme
        // DELETE : /api/task/job name
        [HttpDelete("api/taskproject")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> DeleteTaskProject(string job)
        {
            var deletedTaskProjectDomainModel = await taskRepository.DeleteTaskProjectAsync(job);

            if (deletedTaskProjectDomainModel == null)
            {
                return NotFound();
            }

            // Map DOmain Model to DTO
            return Ok(mapper.Map<ProjectTaskDto>(deletedTaskProjectDomainModel));
        }
    }
}
