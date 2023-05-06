using System.Collections.Generic;

namespace IdentityServer.DTOs;

public class PaginatedUserResponse
{
    public int Count { get; set; }
    public IEnumerable<UserDetails> Users { get; set; } = null!;
}
