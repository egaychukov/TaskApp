using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TaskApp.Server.Controllers;
using TaskApp.Server.Validators;

namespace TaskApp.Server.Filters;

class PaginationValidationFilter : ActionFilterAttribute
{
    private readonly IValidator<PaginationDto> validator;
    
    public PaginationValidationFilter(IValidator<PaginationDto> validator)
    {
        this.validator = validator;
    }

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        foreach (var argument in context.ActionArguments.Values)
        {
            if (argument is PaginationDto pagination && pagination is not null)
            {
                var validationResult = await validator.ValidateAsync(pagination);
                
                if (!validationResult.IsValid)
                {
                    context.Result = new BadRequestObjectResult(new {
                        Errors = validationResult.GetValidationMessages(),
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