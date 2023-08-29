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
            inviteDb.time = invite.time;
            inviteDb.place = invite.place;
            _logger.LogInformation($"Updating invite for user {invite.inviteeEmail} from user: {invite.userEmail}");
        }
        else
        {
            await _context.Invites.AddAsync(new Invite(invite.userEmail, invite.inviteeEmail, InviteStatus.PENDING_ANSWER, invite.time, invite.place));
            _logger.LogInformation($"Creating invite for user: {invite.inviteeEmail}");   
        }
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<IEnumerable<InviteNotification>> FindAll(string userEmail)
    {
        
        var userNames = await getUserNames();
        var result = userNames
            .Join(_context.Attendees, response => response.inviteeEmail, attendee => attendee.Email,
                (response, attendee) =>
                    new InviteNotification(response.id, response.userEmail, response.userName, response.inviteeEmail,
                        attendee.Name, response.timestamp, response.status, response.time, response.place))
            .Where(notification => notification.userEmail == userEmail || notification.inviteeEmail == userEmail);
        return result.ToList();
    }

    private async Task<IEnumerable<UserResponse>> getUserNames()
    {
        return await _context.Invites
            .Join(_context.Attendees, invite => invite.UserEmail, attendee => attendee.Email,
                (invite, attendee) => 
                    new UserResponse(invite.Id, invite.UserEmail, attendee.Name, invite.InviteeEmail, 
                        EnumConversionExtension.mapToModel(invite.status), invite.timestamp, invite.time, invite.place)
                )
            .ToListAsync();
    }
}