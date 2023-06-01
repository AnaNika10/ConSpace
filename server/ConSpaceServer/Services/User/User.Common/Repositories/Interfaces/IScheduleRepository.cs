#region

using User.Common.DTOs;

#endregion

namespace User.Common.Repositories;

public interface IScheduleRepository
{
    Task<bool> create(Guid userId, SeminarDto seminar);
    Task<bool> delete(Guid userId, Guid seminarId);
}