using AutoMapper;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Models.DTO;

namespace JobManagementProject.API.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Users, UsersDto>().ReverseMap();

            CreateMap<AddUsersRequestDto, Users>().ReverseMap();

            CreateMap<AddTimeSheetRequestDto, TimeSheets>().ReverseMap();

            CreateMap<TimeSheets, TimeSheetDto>().ReverseMap();

            CreateMap<UpdateTimeSheetRequestDto, TimeSheets>().ReverseMap();

            CreateMap<AddTaskRequestDto, Tasks>().ReverseMap();

            CreateMap<Tasks, TaskDto>().ReverseMap();

            CreateMap<UpdateTaskRequestDto, Tasks>().ReverseMap();

            CreateMap<AddClientRequestDto, Clients>().ReverseMap();

            CreateMap<Clients, ClientDto>().ReverseMap();

            CreateMap<UpdateClientRequestDto, Clients>().ReverseMap();

            CreateMap<AddProjectRequestDto, Project>().ReverseMap();

            CreateMap<Project, ProjectDto>().ReverseMap();

            CreateMap<UpdateProjectRequestDto , Project>().ReverseMap();

            CreateMap<ProjectTask, ProjectTaskDto>().ReverseMap();

            CreateMap<AddProjectTaskRequestDto, ProjectTask>().ReverseMap();

            //CreateMap<Currency,  CurrencyDto>().ReverseMap();
        }
    }
}
