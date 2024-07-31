using FluentValidation;
using TaskApp.Server.Controllers;

namespace TaskApp.Server.Validators;

public class PaginationValidator : AbstractValidator<PaginationDto>
{
    public PaginationValidator()
    {
        RuleFor(p => p.PageNumber)
            .GreaterThan(0);

        RuleFor(p => p.PageSize)
            .GreaterThan(0);
    }
}