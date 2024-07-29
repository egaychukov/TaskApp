namespace TaskApp.Server.DataLayer;

public class UserTaskType
{
    public int UserTaskTypeId { get; set; }
    public string Title { get; set; }
    
    public List<UserTask> UserTasks { get; set; } 
}