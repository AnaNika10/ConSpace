#region

using Microsoft.EntityFrameworkCore;
using User.Application.Contracts.Persistence;
using User.Domain.Entities;
using User.Infrastructure.Persistence;

#endregion

namespace User.Infrastructure.Repositories;

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
            .Where(reminder => reminder.Type == type).ToListAsync();
    }

    public async Task<IEnumerable<Reminder>> findByEventId(Guid userId, Guid eventId)
    {
        _logger.LogInformation("Fetching all reminders with eventId {} for user with userId: {}", eventId, userId);
        return await _context.Reminders.Where(reminder => reminder.UserId == userId && reminder.EventId == eventId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Reminder>> findByType(Guid userId, ReminderType type)
    {
        _logger.LogInformation("Fetching all reminders with type {} for user with userId: {}", type, userId);
        return await _context.Reminders
            .Where(reminder => reminder.UserId == userId && reminder.Type == type)
            .ToListAsync();
    }
}