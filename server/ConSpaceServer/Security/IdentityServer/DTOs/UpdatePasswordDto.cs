using System.ComponentModel.DataAnnotations;

namespace IdentityServer.DTOs;

public class UpdatePasswordDto
{
    [Required(ErrorMessage = "Password is required")]
    public string CurrentPassword { get; set; } = null!;

    [Required(ErrorMessage = "New password is required")]
    public string NewPassword { get; set; } = null!;
}
