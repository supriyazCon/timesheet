using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementProject.API.Controllers
{
    //api/Project
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IProjectRepository projectRepository;

        public ProjectController(IMapper mapper, IProjectRepository projectRepository)
        {
            this.mapper = mapper;
            this.projectRepository = projectRepository;
        }



        // Get All Projects
        // GET : /api/project
        [HttpGet]
       // [Authorize(Roles = "ProjectManager, DeliveryManager")]
        public async Task<IActionResult> GetAll()
        {
            var projectsDomainModel = await projectRepository.GetAllAsync();

            //Map Domain MOdel to DTO
            return Ok(mapper.Map<List<ProjectDto>>(projectsDomainModel));
        }

        // Get a Project By Id
        // GET : /api/project/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "ProjectManager, DeliveryManager")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var projectDomainModel = await projectRepository.GetByIdAsync(id);

            if (projectDomainModel == null)
            {
                return NotFound();
            }

            var client = projectDomainModel.Clients;
            var projectDto = mapper.Map<ProjectDto>(projectDomainModel);

            // Map Domain Model To DTO
             return Ok(mapper.Map<ProjectDto>(projectDomainModel));
            //return CreatedAtAction(nameof(GetAll), new { Clients = client}, projectDomainModel);
        }


        // Create Project
        // POST : api/project
        [HttpPost]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Create([FromBody] AddProjectRequestDto addProjectRequestDto)
        {
            // Map DTo to Domain Model
            var projectDomainModel = mapper.Map<Project>(addProjectRequestDto);

            await projectRepository.CreateAsync(projectDomainModel);

            //Map Domain Model To DTO
            return Ok(mapper.Map<ProjectDto>(projectDomainModel));
        }


        // Update Project By Id
        // PUT :/api/project/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateProjectRequestDto updateProjectRequestDto)
        {
            // Map DTO to Domain Model
            var projectDomainModel = mapper.Map<Project>(updateProjectRequestDto);

            projectDomainModel = await projectRepository.UpdateAsync(id, projectDomainModel);

            if (projectDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain MOdel to DTO
            return Ok(mapper.Map<ProjectDto>(projectDomainModel));
        }


        // Delete Project By Id
        // DELETE :/api/project/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedProjectDomainModel = await projectRepository.DeleteAsync(id);

            if (deletedProjectDomainModel == null)
            {
                return NotFound();
            }

            // Map DOmain Model to DTO
            return Ok(mapper.Map<ProjectDto>(deletedProjectDomainModel));
        }
    }
}
