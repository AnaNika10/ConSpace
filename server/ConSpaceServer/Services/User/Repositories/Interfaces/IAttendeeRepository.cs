#region

using User.DTO;

#endregion

namespace User.Repositories;

public interface IAttendeeRepository
{
    public Task<bool> create(AttendeeDto attendee);
}