using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using User.Common.Data;
using User.Common.DTOs;
using User.Common.Entities;
using User.Common.Extensions;
using User.Common.Models;

namespace User.Common.Repositories;

public class InvitesRepository : IInvitesRepository
{
    private readonly UserContext _context;
    private readonly ILogger<NoteRepository> _logger;

    public InvitesRepository(UserContext context, ILogger<NoteRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<bool> UpsertInvite(InviteDto invite)
    {
        if (invite.id != null)
        {
            Invite inviteDb = await _context.Invites.SingleAsync(it => it.Id == invite.id);
            inviteDb.status = EnumConversionExtension.mapToEntity(invite.status);
            _logger.LogInformation($"Updating invite for user {invite.inviteeId} from user: {invite.userId}");
        }
        else
        {
            await _context.Invites.AddAsync(new Invite(invite.userId, invite.inviteeId, InviteStatus.PENDING_ANSWER));
            _logger.LogInformation($"Creating invite for user: {invite.inviteeId}");   
        }
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<IEnumerable<InviteNotification>> FindAll(Guid userId)
    {
        
        var userNames = await getUserNames();
        var result = userNames
            .Join(_context.Attendees, response => response.inviteeId, attendee => attendee.Id,
                (response, attendee) =>
                    new InviteNotification(response.id, response.userId, response.userName, response.inviteeId,
                        attendee.Name, response.timestamp, response.status, response.time, response.place))
            .Where(notification => notification.userId == userId || notification.inviteeId == userId);
        return result.ToList();
    }

    private async Task<IEnumerable<UserResponse>> getUserNames()
    {
        return await _context.Invites
            .Join(_context.Attendees, invite => invite.UserId, attendee => attendee.Id,
                (invite, attendee) => 
                    new UserResponse(invite.Id, invite.UserId, attendee.Name, invite.InviteeId, 
                        EnumConversionExtension.mapToModel(invite.status), invite.timestamp, invite.time, invite.place)
                )
            .ToListAsync();
    }
}