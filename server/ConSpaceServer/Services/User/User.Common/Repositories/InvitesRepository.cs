using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using User.Common.Data;
using User.Common.DTOs;
using User.Common.Entities;

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

    public async Task<bool> SaveInvite(InviteDto invite)
    {
        await _context.Invites.AddAsync(new Invite(invite.userId, invite.inviteeId, InviteStatus.PENDING_ANSWER));
        _logger.LogInformation($"Creating invite for user: {invite.userId}");
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<IEnumerable<Invite>> FindAll(Guid userId)
    {
        return await _context.Invites.Where(invite => invite.InviteeId == userId).ToListAsync();
    }
}