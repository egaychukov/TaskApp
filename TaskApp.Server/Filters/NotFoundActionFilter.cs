using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TaskApp.Server.Filters;

public class NotFoundActionFilter : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Result is ObjectResult result)
        {
            if (result.Value is null)
                context.Result = new NotFoundObjectResult(null);
        }
    }
}