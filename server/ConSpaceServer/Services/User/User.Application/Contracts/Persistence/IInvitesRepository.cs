using User.Application.Models;
using User.Domain.Entities;

namespace User.Application.Contracts.Persistence;

public interface IInvitesRepository
{
    Task<bool> UpsertInvite(Invite invite, bool exists);
    Task<IEnumerable<InviteNotification>> FindAll(string userEmail);
}