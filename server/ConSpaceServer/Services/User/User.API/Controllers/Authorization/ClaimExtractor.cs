#region

using System.Security.Claims;
using User.API.Controllers.Exceptions;

#endregion

namespace User.API.Controllers.Authorization;

public class ClaimExtractor
{
    private static ILogger<ClaimExtractor> _logger;

    private ClaimExtractor(ILogger<ClaimExtractor> logger)
    {
        _logger = logger;
    }

    public static Guid ExtractUserId(IEnumerable<Claim> claims)
    {
        var userId = claims.FirstOrDefault(x =>
                x.Type.Equals("Id", StringComparison.OrdinalIgnoreCase)
            )
            ?.Value;
        if (userId == null)
        {
            _logger.LogError("User id could not be extracted from authorization header.");
            throw new MissingClaimException("Can't retrieve user claims");
        }

        return Guid.Parse(userId);
    }
    
    public static string ExtractEmail(IEnumerable<Claim> claims)
    {
        var email = claims.FirstOrDefault(x =>
                x.Type.Equals("Email", StringComparison.OrdinalIgnoreCase)
            )
            ?.Value;
        if (email == null)
        {
            _logger.LogError("User id could not be extracted from authorization header.");
            throw new MissingClaimException("Can't retrieve user claims");
        }

        return email;
    }
}