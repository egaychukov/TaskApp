using System.ComponentModel.DataAnnotations;

namespace TaskApp.Server.Controllers;

public class PaginationDto
{
    [Required]
    public int PageNumber { get; set; }

    [Required]
    public int PageSize { get; set; }
}