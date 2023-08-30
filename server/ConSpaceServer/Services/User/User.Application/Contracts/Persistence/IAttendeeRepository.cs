#region

#endregion

using User.Domain.Entities;

namespace User.Application.Contracts.Persistence;

public interface IAttendeeRepository
{
    public Task<bool> create(Attendee attendee);
}