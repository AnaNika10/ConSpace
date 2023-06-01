#region

using User.Common.DTOs;

#endregion

namespace User.Common.Repositories;

public interface IAttendeeRepository
{
    public Task<bool> create(AttendeeDto attendee);
}