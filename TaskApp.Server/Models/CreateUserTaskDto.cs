namespace TaskApp.Server.Controllers;

public class CreateUserTaskDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int UserTaskTypeId { get; set; }
}