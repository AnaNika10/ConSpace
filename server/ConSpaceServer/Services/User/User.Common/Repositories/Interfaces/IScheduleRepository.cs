#region

using User.Common.DTOs;
using User.Common.Entities;

#endregion

namespace User.Common.Repositories;

public interface IScheduleRepository
{
    Task<bool> create(Guid userId, SeminarDto seminar);
    Task<bool> delete(Guid userId, Guid seminarId);

    Task<bool> update(SeminarDto seminar);

    Task<IEnumerable<Seminar>> getSchedule(Guid userId);
}