using Microsoft.AspNetCore.Mvc;
using TaskApp.Server.Filters;
using TaskApp.Server.Services;

namespace TaskApp.Server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserTaskTypesController : ControllerBase
{
    private readonly IUserTaskTypesService taskTypesService;

    public UserTaskTypesController(IUserTaskTypesService taskTypesService)
    {
        this.taskTypesService = taskTypesService;
    }

    [HttpGet]
    [ServiceFilter(typeof(NotFoundActionFilter))]
    public async Task<IActionResult> GetTaskTypes()
    {
        return Ok(await taskTypesService.GetUserTaskTypesAsync());
    }
}