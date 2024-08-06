using TaskApp.Server.DataLayer;

namespace TaskApp.Server.Services;

public interface IUserTasksService
{
    Task<UserTask> AddTaskAsync(UserTask userTask);
    Task<bool> TaskTitleExistsAsync(string title);
    Task<IEnumerable<UserTask>?> GetTasksByTitleAsync(string title);
    Task<IEnumerable<UserTask>?> GetTasks();
}