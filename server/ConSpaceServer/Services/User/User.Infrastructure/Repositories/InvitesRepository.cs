using AutoMapper;
using Microsoft.EntityFrameworkCore;
using User.Application.Contracts.Persistence;
using User.Application.Models;
using User.Domain.Entities;
using User.Infrastructure.Persistence;

namespace User.Infrastructure.Repositories;

public class InvitesRepository : IInvitesRepository
{
    private readonly UserContext _context;
    private readonly ILogger<NoteRepository> _logger;
    private readonly IMapper _mapper;

    public InvitesRepository(UserContext context, ILogger<NoteRepository> logger, IMapper mapper)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<bool> UpsertInvite(Invite invite, bool exists)
    {
        if (exists)
        {
            Invite inviteDb = await _context.Invites.SingleAsync(it => it.Id == invite.Id);
            inviteDb.Status = invite.Status;
            inviteDb.Time = invite.Time;
            inviteDb.Place = invite.Place;
            _logger.LogInformation($"Updating invite for user {invite.InviteeEmail} from user: {invite.UserEmail}");
        }
        else
        {
            await _context.Invites.AddAsync(new Invite(invite.UserEmail, invite.InviteeEmail,
                InviteStatus.PENDING_ANSWER, invite.Time, invite.Place));
            _logger.LogInformation($"Creating invite for user: {invite.InviteeEmail}");
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
                        _mapper.Map<InviteNotificationStatus>(invite.Status), invite.Timestamp, invite.Time,
                        invite.Place)
            )
            .ToListAsync();
    }
}