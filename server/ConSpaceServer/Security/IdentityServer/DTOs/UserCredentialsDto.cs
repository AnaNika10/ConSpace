using System.ComponentModel.DataAnnotations;

namespace IdentityServer.DTOs;

public class UserCredentialsDto
{
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}