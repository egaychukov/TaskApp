using TaskApp.Server.DataLayer;

namespace TaskApp.Server.Services;

public class UserTaskTypesService : IUserTaskTypesService
{
    private readonly IUserTaskTypesRepository taskTypesRepository;

    public UserTaskTypesService(IUserTaskTypesRepository taskTypesRepository)
    {
        this.taskTypesRepository = taskTypesRepository;
    }
    
    public async Task<IEnumerable<UserTaskType>> GetUserTaskTypesAsync()
    {
        return await taskTypesRepository.GetTaskTypesAsync();
    }
}