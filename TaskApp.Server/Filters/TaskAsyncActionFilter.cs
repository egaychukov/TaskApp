using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TaskApp.Server.Controllers;

namespace TaskApp.Server.Filters;

public class TaskAsyncActionFilter : ActionFilterAttribute
{
    private readonly IValidator<CreateUserTaskDto> validator;

    public TaskAsyncActionFilter(IValidator<CreateUserTaskDto> validator)
    {
        this.validator = validator;
    }

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        foreach (var argument in context.ActionArguments.Values)
        {
            if (argument is CreateUserTaskDto createTaskDto && createTaskDto is not null)
            {
                var validationResult = await validator.ValidateAsync(createTaskDto);
                
                if (!validationResult.IsValid)
                {
                    var errorMessages = validationResult.Errors
                        .Select(error => new {
                            Parameter = error.PropertyName,
                            Message = error.ErrorMessage,
                        });

                    context.Result = new BadRequestObjectResult(new {
                        Errors = errorMessages,
                    });
                }
                else
                {
                    await next();
                }
            }
        }
    }
}