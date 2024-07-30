using TaskApp.Server.DataLayer;

namespace TaskApp.Server.Services;

public interface IUserTasksService
{
    Task AddTaskAsync(UserTask userTask);
    Task<bool> TitleUsedAsync(string title);
    Task<UserTask> GetTaskByTitleAsync(string title);
    Task<IEnumerable<UserTask>> GetTasks(int pageNumber, int pageSize);
}