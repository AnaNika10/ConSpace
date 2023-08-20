using Microsoft.AspNetCore.SignalR;

namespace User.API.Controllers.Hubs;

public class InvitationHub : Hub
{
    public Task NotifyAll(string invite) => Clients.All.SendAsync("Invite received", invite);
}