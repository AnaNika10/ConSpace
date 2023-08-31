#region

#endregion

using User.Application.Contracts.Persistence;
using User.Domain.Entities;
using User.Infrastructure.Persistence;

namespace User.Infrastructure.Repositories;

public class AttendeeRepository : IAttendeeRepository
{
    private readonly UserContext _context;
    private readonly ILogger<AttendeeRepository> _logger;

    public AttendeeRepository(UserContext context, ILogger<AttendeeRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<bool> create(Attendee attendee)
    {
        await _context.Attendees.AddAsync(new Attendee(attendee.Id, attendee.Name,
            attendee.Type, attendee.Email));
        _logger.LogInformation($"Creating user: {attendee.Id}");
        return await _context.SaveChangesAsync() > 0;
    }
}