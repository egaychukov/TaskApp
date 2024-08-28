using System.ComponentModel.DataAnnotations;

namespace TaskApp.Server.Controllers;

public class RequestUserTaskDto
{
    public string? Title { get; set; }

    [Range(0, int.MaxValue)]
    public int PageIndex { get; set; }

    [Range(1, int.MaxValue)]
    public int PageSize { get; set; }
}