using Microsoft.AspNetCore.SignalR;

namespace User.API.Controllers.Authorization;

public class EmailBasedUserIdProvider : IUserIdProvider
{
    public virtual string GetUserId(HubConnectionContext connection)
    {
        return ClaimExtractor.ExtractEmail(connection.User.Claims);
    }
}