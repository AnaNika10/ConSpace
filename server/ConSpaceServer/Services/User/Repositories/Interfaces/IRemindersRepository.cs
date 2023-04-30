#region

using User.Entities;
using ReminderType = User.DTO.ReminderType;

#endregion

namespace User.Repositories;

public interface IRemindersRepository
{
    Task<IEnumerable<Reminder>> findAllFilterByType(ReminderType type);
    Task<IEnumerable<Reminder>> findByEventId(Guid userId, Guid eventId);
    Task<IEnumerable<Reminder>> findByType(Guid userId, ReminderType type);
}