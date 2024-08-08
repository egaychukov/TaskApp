using Microsoft.AspNetCore.Mvc;
using TaskApp.Server.Services;
using TaskApp.Server.DataLayer;
using TaskApp.Server.Filters;
using AutoMapper;

namespace TaskApp.Server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserTasksController : ControllerBase
{
    private readonly IUserTasksService tasksService;
    private readonly IMapper mapper;

    public UserTasksController(IUserTasksService tasksService, IMapper mapper)
    {
        this.tasksService = tasksService;
        this.mapper = mapper;
    }

    [HttpPost]
    [ServiceFilter(typeof(TaskAsyncActionFilter))]
    public async Task<IActionResult> CreateTask([FromBody] CreateUserTaskDto createTaskDto)
    {
        return Ok(await tasksService.AddTaskAsync(mapper.Map<UserTask>(createTaskDto)));
    }

    [HttpGet]
    public async Task<IActionResult> CheckTitle([FromQuery] string title)
    {
        return Ok(await tasksService.TaskTitleExistsAsync(title));
    }

    [HttpGet]
    public async Task<IActionResult> GetTasksByTitle([FromQuery] string? title)
    {
        var foundTasks = await tasksService.GetTasksByTitleAsync(title);

        if (foundTasks is null)
            return NotFound();

        return Ok(mapper.Map<List<ResponseUserTaskDto>>(foundTasks));
    }
}