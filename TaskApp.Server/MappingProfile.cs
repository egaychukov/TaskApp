using AutoMapper;
using Microsoft.Extensions.Options;
using TaskApp.Server.Controllers;
using TaskApp.Server.DataLayer;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateUserTaskDto, UserTask>();
        CreateMap<UserTask, ResponseUserTaskDto>()
            .ForMember(
                dest => dest.TaskType,
                 opt => opt.MapFrom(src => src.UserTaskType.Title)
            );


    }
}