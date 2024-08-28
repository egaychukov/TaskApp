using Microsoft.EntityFrameworkCore;

namespace TaskApp.Server.DataLayer;

public class UserTasksRepository : IUserTasksRepository
{
    private readonly UserTasksDbContext userTasksContext;

    public UserTasksRepository(UserTasksDbContext userTasksContext)
        => this.userTasksContext = userTasksContext;

    public async Task<UserTask> AddTaskAsync(UserTask userTask)
    {
        await userTasksContext.AddAsync(userTask);
        await userTasksContext.SaveChangesAsync();
        return userTask;
    }

    public async Task<IEnumerable<UserTask>?> GetTasksByTitleAsync(string title, int pageIndex, int pageSize)
    {
        var foundTasks = (await GetTasksAsync(title))
            .Skip(pageIndex * pageSize)
            .Take(pageSize);
        
        return foundTasks.Count() > 0 ? foundTasks.ToList() : null;
    }

    public async Task<int> CountTasksAsync(string title)
    {
        var foundTasks = await GetTasksAsync(title);
        return foundTasks.Count();
    }

    private async Task<IEnumerable<UserTask>?> GetTasksAsync(string title)
    {
        if (string.IsNullOrEmpty(title))
            title = string.Empty;

        return userTasksContext.UserTasks
            .Where(task => task.Title.Contains(title))
            .Include(task => task.UserTaskType);
    }

    public async Task<bool> TaskTitleExistsAsync(string title)
    {
        var taskCount = await userTasksContext.UserTasks
            .CountAsync(u => u.Title == title);

        return taskCount > 0;
    }
}