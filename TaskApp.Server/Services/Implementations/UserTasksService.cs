using TaskApp.Server.DataLayer;

namespace TaskApp.Server.Services;

class UserTasksService : IUserTasksService
{
    private readonly IUserTasksRepository userTasksRepository;

    public UserTasksService(IUserTasksRepository userTasksRepository)
    {
        this.userTasksRepository = userTasksRepository;
    }

    public async Task<UserTask> AddTaskAsync(UserTask userTask)
    {
        return await userTasksRepository.AddTaskAsync(userTask);
    }

    public async Task<bool> TitleUsedAsync(string title)
    {
        var userTask = await userTasksRepository.GetTaskByTitleAsync(title);
        return userTask != null;
    }

    public async Task<UserTask?> GetTaskByTitleAsync(string title)
    {
        return await userTasksRepository.GetTaskByTitleAsync(title);
    }

    public async Task<IEnumerable<UserTask>?> GetTasks()
    {
        return await userTasksRepository.GetTasksAsync();
    }
}