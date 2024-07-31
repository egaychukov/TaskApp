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

    public async Task<UserTask?> GetTaskByTitleAsync(string title)
    {
        return await userTasksContext.UserTasks
            .SingleOrDefaultAsync(task => task.Title == title);
    }

    public async Task<IEnumerable<UserTask>?> GetTasksAsync(int pageNumber, int pageSize)
    {
        var foundTasks = userTasksContext.UserTasks
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize);

        return foundTasks.Count() != 0
            ? await foundTasks.ToListAsync()
            : null;
    }
}