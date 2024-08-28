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

    public async Task<bool> TaskTitleExistsAsync(string title)
    {
        return await userTasksRepository.TaskTitleExistsAsync(title);
    }

    public async Task<IEnumerable<UserTask>?> GetTasksByTitleAsync(string title, int pageIndex, int pageSize)
    {
        return await userTasksRepository.GetTasksByTitleAsync(title, pageIndex, pageSize);
    }

    public async Task<int> CountTasksAsync(string title)
    {
        return await userTasksRepository.CountTasksAsync(title);
    }
}