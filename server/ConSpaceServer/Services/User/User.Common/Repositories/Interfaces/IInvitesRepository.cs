using User.Common.DTOs;
using User.Common.Entities;

namespace User.Common.Repositories;

public interface IInvitesRepository
{
    Task<bool> SaveInvite(InviteDto invite);
    Task<IEnumerable<Invite>> FindAll(Guid userId);
}