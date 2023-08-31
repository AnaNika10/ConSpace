#region

#endregion

using User.Domain.Entities;

namespace User.Application.Contracts.Persistence;

public interface IScheduleRepository
{
    Task<bool> create(Guid userId, Seminar seminar);
    Task<bool> delete(Guid userId, Guid seminarId);

    Task<bool> update(Seminar seminar);

    Task<IEnumerable<Seminar>> getSchedule(Guid userId);
}