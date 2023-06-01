#region

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using User.Common.Data;
using User.Common.Entities;
using User.Common.Extensions;
using ReminderType = User.Common.DTOs.ReminderType;

#endregion

namespace User.Common.Repositories;

public class ReminderRepository : IRemindersRepository
{
    private readonly UserContext _context;
    private readonly ILogger<ReminderRepository> _logger;

    public ReminderRepository(UserContext context, ILogger<ReminderRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<IEnumerable<Reminder>> findAllFilterByType(ReminderType type)
    {
        _logger.LogInformation($"Fetching all {type} reminders");
        return await _context.Reminders
            .Where(reminder => reminder.type == EnumConversionExtension.mapToEntity(type)).ToListAsync();
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
            .Where(reminder => reminder.userId == userId && reminder.type == EnumConversionExtension.mapToEntity(type))
            .ToListAsync();
    }
}