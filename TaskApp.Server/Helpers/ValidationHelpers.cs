using FluentValidation.Results;

namespace TaskApp.Server.Validators;

public static class ValidationHelpers
{
    public static IEnumerable<ValidationMessage> GetValidationMessages(
        this ValidationResult validationResult)
    {
        return validationResult.Errors
            .Select(error => new ValidationMessage {
                        Parameter = error.PropertyName,
                        Message = error.ErrorMessage,
                    });
    }
}