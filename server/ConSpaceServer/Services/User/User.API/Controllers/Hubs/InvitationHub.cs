using System.Collections.Concurrent;
using Common.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using User.API.Controllers.Authorization;
using User.Common.DTOs;
using User.Common.Repositories;

namespace User.API.Controllers.Hubs;

[Authorize(Policy = RolePolicy.SpeakerOrUser)]
public class InvitationHub : Hub
{
    private readonly ILogger<InvitationHub> _logger;
    private readonly IInvitesRepository _invitesRepository;
    public static ConcurrentDictionary<string, string> Connections = new ConcurrentDictionary<string, string>();

    public InvitationHub(ILogger<InvitationHub> logger, IInvitesRepository invitesRepository)
    {
        _logger = logger;
        _invitesRepository = invitesRepository;
    }

    public async Task NotifyInvitee(InviteDto invite)
    {
        await _invitesRepository.UpsertInvite(invite);
        string connectionId;
        Connections.TryGetValue(invite.inviteeId.ToString(), out connectionId);
        await Clients.Client(connectionId).SendAsync("InviteReceived", invite);
    }

    public override async Task OnConnectedAsync()
    {
        if (!Connections.ContainsKey(Context.ConnectionId))
        {
            Connections.TryAdd(ClaimExtractor.ExtractUserId(Context.User.Claims).ToString(), Context.ConnectionId);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connectionId = Context.ConnectionId;
        Connections.Remove(ClaimExtractor.ExtractUserId(Context.User.Claims).ToString(), out connectionId);
        await base.OnDisconnectedAsync(exception);
    }
}