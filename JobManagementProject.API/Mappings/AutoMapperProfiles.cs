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

            CreateMap<AddTaskRequestDto, Tasks>().ReverseMap();

            CreateMap<Tasks, TaskDto>().ReverseMap();

            CreateMap<UpdateTaskRequestDto, Tasks>().ReverseMap();

            CreateMap<AddClientRequestDto, Client>().ReverseMap();

            CreateMap<Client, ClientDto>().ReverseMap();

            CreateMap<UpdateClientRequestDto, Client>().ReverseMap();

            CreateMap<AddProjectRequestDto, Project>().ReverseMap();

            CreateMap<Project, ProjectDto>().ReverseMap();

            CreateMap<UpdateProjectRequestDto , Project>().ReverseMap();

            CreateMap<ProjectTask, ProjectTaskDto>().ReverseMap();

            CreateMap<AddProjectTaskRequestDto, ProjectTask>().ReverseMap();

            CreateMap<AddLogRequestDto, DailyLog>().ReverseMap();

            CreateMap<UpdateDailyLogRequestDto, DailyLog>().ReverseMap();



        }
    }
}
