namespace TaskApp.Server.DataLayer;

public interface IUserTasksRepository
{
    Task<UserTask> AddTaskAsync(UserTask userTask);
    Task<IEnumerable<UserTask>?> GetTasksAsync();
    Task<UserTask?> GetTaskByTitleAsync(string title);
}