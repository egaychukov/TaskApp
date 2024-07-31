namespace TaskApp.Server.DataLayer;

public interface IUserTasksRepository
{
    Task<UserTask> AddTaskAsync(UserTask userTask);
    Task<IEnumerable<UserTask>?> GetTasksAsync(int pageNumber, int pageSize);
    Task<UserTask?> GetTaskByTitleAsync(string title);
}