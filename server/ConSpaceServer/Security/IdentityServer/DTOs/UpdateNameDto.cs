using System.ComponentModel.DataAnnotations;

namespace IdentityServer.DTOs;

public class UpdateNameDto
{
    [Required(ErrorMessage = "FirstName is required")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "LastName is required")]
    public string LastName { get; set; }
}
