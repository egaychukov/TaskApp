using Microsoft.EntityFrameworkCore;

namespace TaskApp.Server.DataLayer;

public class UserTasksRepository : IUserTasksRepository
{
    private readonly UserTasksDbContext userTasksContext;

    public UserTasksRepository(UserTasksDbContext userTasksContext)
        => this.userTasksContext = userTasksContext;

    public async Task AddTaskAsync(UserTask userTask)
    {
        await userTasksContext.AddAsync(userTask);
        await userTasksContext.SaveChangesAsync();
    }

    public async Task<UserTask> GetTaskByTitleAsync(string title)
        => await userTasksContext.UserTasks
            .SingleOrDefaultAsync(task => task.Title == title);

    public async Task<IEnumerable<UserTask>> GetTasksAsync(int pageNumber, int pageSize)
        => await userTasksContext.UserTasks
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
}