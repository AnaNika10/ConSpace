using User.Common.DTOs;
using User.Common.Entities;
using User.Common.Models;

namespace User.Common.Repositories;

public interface IInvitesRepository
{
    Task<bool> UpsertInvite(InviteDto invite);
    Task<IEnumerable<InviteNotification>> FindAll(Guid userId);
}