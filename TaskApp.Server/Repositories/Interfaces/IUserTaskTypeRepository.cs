namespace TaskApp.Server.DataLayer;

public interface IUserTaskTypeRepository
{
    Task<IEnumerable<UserTaskType>> GetTaskTypesAsync();
}