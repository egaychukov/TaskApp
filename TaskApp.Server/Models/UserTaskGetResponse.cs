namespace TaskApp.Server.Controllers;

public class UserTaskGetResponse
{
    public List<UserTaskGetResponseDto> Tasks { get; set; }
    public int Count { get; set; }
}

public class UserTaskGetResponseDto
{
    public int UserTaskId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string TaskType { get; set; }
}