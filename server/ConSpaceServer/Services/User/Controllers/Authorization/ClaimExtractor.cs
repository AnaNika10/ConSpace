using System.Security.Claims;
using User.Controllers.Exceptions;

namespace User.Controllers.Authorization;

public class ClaimExtractor
{
    private static ILogger<ClaimExtractor> _logger;
    
    ClaimExtractor(ILogger<ClaimExtractor> logger)
    {
        _logger = logger;
    }

    public static Guid ExtractUserId(IEnumerable<Claim> claims)
    {
        var userId = claims.FirstOrDefault(x => 
                x.Type.Equals(ClaimTypes.NameIdentifier, StringComparison.OrdinalIgnoreCase)
            )
            ?.Value;
        if (userId==null)
        {
            _logger.LogError("User id could not be extracted from authorization header.");
            throw new MissingClaimException("Can't retrieve user claims"); 
        }
        return Guid.Parse(userId);
    }
}