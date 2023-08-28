#region

using Microsoft.Extensions.Logging;
using User.Common.Data;
using User.Common.DTOs;
using User.Common.Entities;
using User.Common.Extensions;

#endregion

namespace User.Common.Repositories;

public class AttendeeRepository : IAttendeeRepository
{
    private readonly UserContext _context;
    private readonly ILogger<AttendeeRepository> _logger;

    public AttendeeRepository(UserContext context, ILogger<AttendeeRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<bool> create(AttendeeDto attendee)
    {
        await _context.Attendees.AddAsync(new Attendee(attendee.Id, attendee.Name,
            EnumConversionExtension.mapToEntity(attendee.Type), attendee.Email));
        _logger.LogInformation($"Creating user: {attendee.Id}");
        return await _context.SaveChangesAsync() > 0;
    }
}