#region

using User.Domain.Entities;

#endregion

namespace User.Application.Contracts.Persistence;

public interface IRemindersRepository
{
    Task<IEnumerable<Reminder>> findAllFilterByType(ReminderType type);
    Task<IEnumerable<Reminder>> findByEventId(Guid userId, Guid eventId);
    Task<IEnumerable<Reminder>> findByType(Guid userId, ReminderType type);
}