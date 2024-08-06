namespace TaskApp.Server.DataLayer;

public interface IUserTasksRepository
{
    Task<UserTask> AddTaskAsync(UserTask userTask);
    Task<IEnumerable<UserTask>?> GetTasksAsync();
    Task<IEnumerable<UserTask>?> GetTasksByTitleAsync(string title);
    Task<bool> TaskTitleExistsAsync(string title);
}