using FluentValidation;
using TaskApp.Server.Controllers;
using TaskApp.Server.Services;

namespace TaskApp.Server.Validators;

public class UserTaskValidator : AbstractValidator<CreateUserTaskDto>
{
    public UserTaskValidator(IUserTasksService tasksService)
    {
        RuleFor(task => task.Description)
            .NotNull()
            .NotEmpty();

        RuleFor(task => task.Title)
            .NotNull()
            .NotEmpty()
            .MustAsync(async (title, t) => !(await tasksService.TitleUsedAsync(title)))
            .WithMessage("The title specified is already present in the database");

        RuleFor(task => task.UserTaskTypeId)
            .NotNull();
    }
}