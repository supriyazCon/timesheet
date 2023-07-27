﻿using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace JobManagementProject.API.Controllers
{
    // api/clients
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IClientRepository clientRepository;
        private readonly ILogger<ClientController> logger;

        public ClientController(IMapper mapper, IClientRepository clientRepository, ILogger<ClientController> logger)
        {
            this.mapper = mapper;
            this.clientRepository = clientRepository;
            this.logger = logger;
        }


        // Get All Clients
        // GET : /api/clients
        [HttpGet]
        //[Authorize(Roles = "ProjectManager, DeliveryManager")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                //throw new Exception("This is a custom exception");

                //Get data from database - Domain Model
                var clientsDomainModel = await clientRepository.GetAllAsync();

                // Return DTOs

                logger.LogInformation($"Finished GetAllClients request with data: {JsonSerializer.Serialize(clientsDomainModel)}");

                return Ok(mapper.Map<List<ClientDto>>(clientsDomainModel));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw;
            }


          
        }

        // Get All Clients by ID
        // GET : /api/clients/{id}
        [HttpGet]
        [Route("{id:Guid}")]
       // [Authorize(Roles = "ProjectManager, DeliveryManager")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var clientDomainModel = await clientRepository.GetByIdAsync(id);

            if (clientDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<ClientDto>(clientDomainModel));
        }



        //Create Clients
        // POST : /api/clients
        [HttpPost]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Create([FromBody] AddClientRequestDto addClientRequestDto)
        {
            // Map DTO to Domain Model
           var clientDomainModel = mapper.Map<Clients>(addClientRequestDto);

             await clientRepository.CreateAsync(clientDomainModel);

            // Map Domain Model To DTO
             return Ok(mapper.Map<ClientDto>(clientDomainModel));


        }


       

        // Update a Client By Id
        // PUT : /api/clients/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateClientRequestDto updateClientRequestDto)
        {
            // Map DTO to Domain Model
            var clientDomainModel = mapper.Map<Clients>(updateClientRequestDto);

            clientDomainModel= await clientRepository.UpdateAsync(id, clientDomainModel);

            if(clientDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model To DTO
            return Ok(mapper.Map<ClientDto>(clientDomainModel));
        }


        // Delete a Client By Id
        // DELETE : /api/clients/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "DeliveryManager, ProjectManager")]

        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
           var deletedClientDomainModel =  await clientRepository.DeleteAsync(id);

            if (deletedClientDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<ClientDto>(deletedClientDomainModel));
        }
    }
}