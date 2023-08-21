using User.Common.DTOs;

namespace User.Common.Repositories;

public interface IInvitesRepository
{
    Task<bool> SaveInvite(InviteDto invite);
}