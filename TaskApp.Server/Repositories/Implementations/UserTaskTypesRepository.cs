
using Microsoft.EntityFrameworkCore;

namespace TaskApp.Server.DataLayer;

class UserTaskTypesRepository : IUserTaskTypesRepository
{
    private readonly UserTasksDbContext userTasksContext;

    public UserTaskTypesRepository(UserTasksDbContext userTasksContext)
        => this.userTasksContext = userTasksContext;

    public async Task<IEnumerable<UserTaskType>> GetTaskTypesAsync()
        => await userTasksContext.UserTaskTypes.ToListAsync();
}