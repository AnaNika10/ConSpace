using User.DTO;

namespace User.Repositories;

public interface IAttendeeRepository
{
    public Task<bool> create(AttendeeDto attendee);
    
}