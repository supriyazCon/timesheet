using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;

namespace JobManagementProject.API.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UsersDto>().ReverseMap();

            CreateMap<AddUsersRequestDto, User>().ReverseMap();

            CreateMap<AddTimeSheetRequestDto, TimeSheet>().ReverseMap();

            CreateMap<TimeSheet, TimeSheetDto>().ReverseMap();

            CreateMap<UpdateTimeSheetRequestDto, TimeSheet>().ReverseMap();

            CreateMap<AddTaskRequestDto, Models.Domain.Tasks>().ReverseMap();

            CreateMap<Models.Domain.Tasks, TaskDto>().ReverseMap();

            CreateMap<UpdateTaskRequestDto, Models.Domain.Tasks>().ReverseMap();

            CreateMap<AddClientRequestDto, Client>().ReverseMap();

            CreateMap<Client, ClientDto>().ReverseMap();

            CreateMap<UpdateClientRequestDto, Client>().ReverseMap();

            CreateMap<AddProjectRequestDto, Project>().ReverseMap();

            CreateMap<Project, ProjectDto>().ReverseMap();

            CreateMap<UpdateProjectRequestDto , Project>().ReverseMap();

            CreateMap<ProjectTask, ProjectTaskDto>().ReverseMap();

            CreateMap<AddProjectTaskRequestDto, ProjectTask>().ReverseMap();

            //CreateMap<Currency,  CurrencyDto>().ReverseMap();
        }
    }
}
