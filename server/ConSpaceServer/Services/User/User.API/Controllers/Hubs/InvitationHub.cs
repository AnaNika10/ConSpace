using System.Collections.Concurrent;
using System.Text.Json;
using System.Text.Json.Serialization;
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
    private static ConcurrentDictionary<string, string> Connections = new ConcurrentDictionary<string, string>();

    public InvitationHub(ILogger<InvitationHub> logger, IInvitesRepository invitesRepository)
    {
        _logger = logger;
        _invitesRepository = invitesRepository;
    }
    
    public async Task NotifyInvitee(string invite, string message)
    {
        var options = new JsonSerializerOptions
        {
            Converters =
            {
                new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
            }
        };
        var inviteDto = JsonSerializer.Deserialize<InviteDto>(invite, options);
        await _invitesRepository.UpsertInvite(inviteDto);
        string connectionId;
        string recipient = inviteDto.userEmail == ClaimExtractor.ExtractEmail(Context.User.Claims) 
            ? inviteDto.inviteeEmail
            : inviteDto.userEmail; 
        Connections.TryGetValue(recipient, out connectionId);
        await Clients.Client(connectionId).SendAsync("InviteReceived", invite, message);
    }

    public override async Task OnConnectedAsync()
    {
        if (!Connections.ContainsKey(Context.ConnectionId))
        {
            Connections.TryAdd(ClaimExtractor.ExtractEmail(Context.User.Claims).ToString(), Context.ConnectionId);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connectionId = Context.ConnectionId;
        Connections.Remove(ClaimExtractor.ExtractEmail(Context.User.Claims).ToString(), out connectionId);
        await base.OnDisconnectedAsync(exception);
    }
}