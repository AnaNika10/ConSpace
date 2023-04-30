using User.Data;
using User.DTO;
using User.Entities;
using User.Extensions;

namespace User.Repositories;

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
        _context.Attendees.AddAsync(
            new Attendee(attendee.Id, attendee.Name, EnumConversionExtension.mapToEntity(attendee.Type))
        );
        _logger.LogInformation($"Creating note for user: {attendee.Id}");
        return await _context.SaveChangesAsync() > 0;
    }
}