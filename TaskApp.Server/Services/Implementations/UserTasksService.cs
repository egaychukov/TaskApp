using TaskApp.Server.DataLayer;

namespace TaskApp.Server.Services;

class UserTasksService : IUserTasksService
{
    private readonly IUserTasksRepository userTasksRepository;

    public UserTasksService(IUserTasksRepository userTasksRepository)
    {
        this.userTasksRepository = userTasksRepository;
    }

    public async Task AddTaskAsync(UserTask userTask)
    {
        await userTasksRepository.AddTaskAsync(userTask);
    }

    public async Task<bool> TitleUsedAsync(string title)
    {
        var userTask = await userTasksRepository.GetTaskByTitleAsync(title);
        return userTask != null;
    }

    public async Task<UserTask> GetTaskByTitleAsync(string title)
    {
        return await userTasksRepository.GetTaskByTitleAsync(title);
    }

    public async Task<IEnumerable<UserTask>> GetTasks(int pageNumber, int pageSize)
    {
        return await userTasksRepository.GetTasksAsync(pageNumber, pageSize);
    }
}