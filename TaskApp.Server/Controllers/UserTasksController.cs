using Microsoft.AspNetCore.Mvc;
using TaskApp.Server.Services;
using TaskApp.Server.DataLayer;

namespace TaskApp.Server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserTasksController : ControllerBase
{
    private readonly IUserTasksService tasksService;

    public UserTasksController(IUserTasksService tasksService)
    {
        this.tasksService = tasksService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateUserTaskDto taskDto)
    {
        await tasksService.AddTaskAsync(new UserTask { 
            Title = taskDto.Title,
            Description = taskDto.Description,
            UserTaskTypeId = taskDto.UserTaskTypeId,
        });

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> CheckTitle([FromQuery] string title)
    {
        return Ok(await tasksService.TitleUsedAsync(title));
    }

    [HttpGet]
    public async Task<IActionResult> GetTaskByTitle([FromQuery] string title)
    {
        return Ok(await tasksService.GetTaskByTitleAsync(title));
    }

    [HttpGet()]
    public async Task<IActionResult> GetTasks(
        [FromQuery] int pageNumber, 
        [FromQuery] int pageSize)
    {
        return Ok(await tasksService.GetTasks(pageNumber, pageSize));
    }
}