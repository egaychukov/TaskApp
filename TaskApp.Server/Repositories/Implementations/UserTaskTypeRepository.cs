
using Microsoft.EntityFrameworkCore;

namespace TaskApp.Server.DataLayer;

class UserTaskTypeRepository : IUserTaskTypeRepository
{
    private readonly UserTasksDbContext userTasksContext;

    public UserTaskTypeRepository(UserTasksDbContext userTasksContext)
        => this.userTasksContext = userTasksContext;

    public async Task<IEnumerable<UserTaskType>> GetTaskTypesAsync()
        => await userTasksContext.UserTaskTypes.ToListAsync();
}