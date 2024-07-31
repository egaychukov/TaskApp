namespace TaskApp.Server.DataLayer;

public interface IUserTaskTypesRepository
{
    Task<IEnumerable<UserTaskType>?> GetTaskTypesAsync();
}