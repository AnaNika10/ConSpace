using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace IdentityServer.DTOs;

public class PaginationRequest
{
    [Required(ErrorMessage = "Page number is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Page number must be greater or equal to 1")]
    public int Page { get; set; }

    [DefaultValue(10)]
    [Range(1, 20, ErrorMessage = "Page size must be between 1 and 20")]
    public int PerPage { get; set; }
}
