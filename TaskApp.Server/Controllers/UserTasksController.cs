using Microsoft.AspNetCore.Mvc;
using TaskApp.Server.Services;
using TaskApp.Server.DataLayer;
using TaskApp.Server.Filters;

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
    [ServiceFilter(typeof(TaskAsyncActionFilter))]
    public async Task<IActionResult> CreateTask([FromBody] CreateUserTaskDto createTaskDto)
    {
        var createdTask = await tasksService.AddTaskAsync(new UserTask { 
            Title = createTaskDto.Title,
            Description = createTaskDto.Description,
            UserTaskTypeId = createTaskDto.UserTaskTypeId,
        });

        return Ok(createdTask);
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

    [HttpGet]
    public async Task<IActionResult> GetTasks([FromQuery] PaginationDto pagination)
    {
        return Ok(await tasksService.GetTasks(pagination.PageNumber, pagination.PageSize));
    }
}