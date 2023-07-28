using AutoMapper;
using JobManagementProject.API.Data;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobManagementProject.API.Controllers
{
    // https://localhost:1234/api/users
    [Route("api/user")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly JobDbContext dbContext;
        private readonly IUsersRepository usersRepository;
        private readonly IMapper mapper;

        public UsersController(JobDbContext dbContext, IUsersRepository usersRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.usersRepository = usersRepository;
            this.mapper = mapper;
        }


        // Get All Users
        // Get : https://localhost:portnumber/api/users
        [HttpGet]
        //[Authorize(Roles = "ProjectManager, DeliveryManager")]
        public async Task<IActionResult> GetAll()
        {
            // Get Data From Database - Domain Models
            var usersDomain = await usersRepository.GetAllAsync();

            // Return DTOs
            return Ok(mapper.Map<List<UsersDto>>(usersDomain));
        }


        // POST to Create new user
        // POST: https://localhost:portnumber/api/users
        [HttpPost]
        //[Authorize(Roles = "ProjectManager, DeliveryManager")]
        public async Task<IActionResult> Create([FromBody] AddUsersRequestDto addUsersRequestDto)
        {
            // Map or Convert to DTO to Domain Model
            var UserDomainModel = mapper.Map<Users>(addUsersRequestDto);
           
            // Use Domain Model to create user
            UserDomainModel = await usersRepository.CreateAsync(UserDomainModel);

            // Map Domain Model Back to DTO
            var userDto = mapper.Map<UsersDto>(UserDomainModel);

            return CreatedAtAction(nameof(GetAll), new { id = UserDomainModel.UserId }, userDto);
        }
    }
}
