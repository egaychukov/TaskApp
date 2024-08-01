using AutoMapper;
using TaskApp.Server.Controllers;
using TaskApp.Server.DataLayer;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateUserTaskDto, UserTask>();
    }
}