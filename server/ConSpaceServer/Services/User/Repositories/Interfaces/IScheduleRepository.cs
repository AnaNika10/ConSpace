#region

using User.DTO;

#endregion

namespace User.Repositories;

public interface IScheduleRepository
{
    Task<bool> create(Guid userId, SeminarDto seminar);
    Task<bool> delete(Guid userId, Guid seminarId);
}