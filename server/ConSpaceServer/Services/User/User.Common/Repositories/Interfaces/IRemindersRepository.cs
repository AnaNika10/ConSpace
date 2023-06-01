#region

using User.Common.Entities;
using ReminderType = User.Common.DTOs.ReminderType;

#endregion

namespace User.Common.Repositories;

public interface IRemindersRepository
{
    Task<IEnumerable<Reminder>> findAllFilterByType(ReminderType type);
    Task<IEnumerable<Reminder>> findByEventId(Guid userId, Guid eventId);
    Task<IEnumerable<Reminder>> findByType(Guid userId, ReminderType type);
}