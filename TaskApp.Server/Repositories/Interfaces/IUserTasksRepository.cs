namespace TaskApp.Server.DataLayer;

public interface IUserTasksRepository
{
    Task<UserTask> AddTaskAsync(UserTask userTask);
    Task<IEnumerable<UserTask>?> GetTasksByTitleAsync(string title, int pageIndex, int pageSize);
    Task<int> CountTasksAsync(string title);
    Task<bool> TaskTitleExistsAsync(string title);
}