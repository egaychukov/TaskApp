using TaskApp.Server.DataLayer;

namespace TaskApp.Server.Services;

public interface IUserTaskTypesService
{
    Task<IEnumerable<UserTaskType>?> GetUserTaskTypesAsync();
}