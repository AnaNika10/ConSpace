using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Entities;

public class UserEntity : IdentityUser
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
