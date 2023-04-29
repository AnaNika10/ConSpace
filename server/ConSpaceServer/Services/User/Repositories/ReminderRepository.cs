using Microsoft.EntityFrameworkCore;
using User.Data;
using User.Entities;
using User.Extensions;
using ReminderType = User.DTO.ReminderType;

namespace User.Repositories;

public class ReminderRepository : IRemindersRepository
{
    private readonly UserContext _context;
    private readonly ILogger<ReminderRepository> _logger;
    
    public ReminderRepository(UserContext context, ILogger<ReminderRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<IEnumerable<Reminder>> findAll(Guid userId)
    {
        _logger.LogInformation("Fetching all reminders for user with userId: {}", userId);
        return await _context.Reminders.Where(reminder => reminder.userId == userId).ToListAsync();
    }

    public async Task<IEnumerable<Reminder>> findByEventId(Guid userId, Guid eventId)
    {
        _logger.LogInformation("Fetching all reminders with eventId {} for user with userId: {}", eventId, userId);
        return await _context.Reminders.Where(reminder => reminder.userId == userId && reminder.eventId == eventId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Reminder>> findByType(Guid userId, ReminderType type)
    {
        _logger.LogInformation("Fetching all reminders with type {} for user with userId: {}", type, userId);
        return await _context.Reminders
            .Where(reminder => reminder.userId == userId && reminder.type == ReminderTypeExtension.mapToEntity(type))
            .ToListAsync();
    }
}