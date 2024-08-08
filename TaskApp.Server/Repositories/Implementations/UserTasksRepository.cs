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

    public async Task<IEnumerable<UserTask>?> GetTasksByTitleAsync(string title)
    {
        if (string.IsNullOrEmpty(title))
            title = string.Empty;

        var foundTasks = userTasksContext.UserTasks
            .Where(task => task.Title.Contains(title));

        return foundTasks.Count() > 0
            ? await foundTasks.ToListAsync()
            : null;
    }

    public async Task<IEnumerable<UserTask>?> GetTasksAsync()
    {
        var foundTasks = userTasksContext.UserTasks;
        
        return foundTasks.Count() > 0
            ? await foundTasks.ToListAsync()
            : null;
    }

    public async Task<bool> TaskTitleExistsAsync(string title)
    {
        var taskCount = await userTasksContext.UserTasks
            .CountAsync(u => u.Title == title);

        return taskCount > 0;
    }
}