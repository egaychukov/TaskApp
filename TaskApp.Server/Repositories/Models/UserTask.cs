namespace TaskApp.Server.DataLayer;

public class UserTask
{
    public int UserTaskId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    public int UserTaskTypeId { get; set; }
    public UserTaskType UserTaskType { get; set; }
}