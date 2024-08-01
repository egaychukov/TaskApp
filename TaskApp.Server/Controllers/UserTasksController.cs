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
        return Ok(await tasksService.TitleUsedAsync(title));
    }

    [HttpGet]
    [NotFoundActionFilter]
    public async Task<IActionResult> GetTaskByTitle([FromQuery] string title)
    {
        return Ok(await tasksService.GetTaskByTitleAsync(title));
    }

    [HttpGet]
    [ServiceFilter(typeof(PaginationValidationFilter))]
    [NotFoundActionFilter]
    public async Task<IActionResult> GetTasks([FromQuery] PaginationDto pagination)
    {
        return Ok(await tasksService.GetTasks(pagination.PageNumber, pagination.PageSize));
    }
}