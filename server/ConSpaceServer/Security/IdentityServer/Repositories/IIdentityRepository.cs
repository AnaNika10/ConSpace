using IdentityServer.Entities;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Repositories;

public interface IIdentityRepository
{
    Task<IdentityResult> CreateUser(User user, string password);
    Task<IdentityResult> UpdateUser(User user);
    Task<bool> AddRoleToUser(User user, string role);
    Task<IEnumerable<string>> GetUserRoles(User user);
    Task<User?> GetUserByEmail(string email);
    Task<IEnumerable<User>> GetAllUsers();
    Task<bool> CheckUserPassword(User user, string password);
    Task CreateRefreshToken(RefreshToken refreshToken);
    Task<RefreshToken?> FindRefreshToken(string refreshToken);
    Task DeleteRefreshToken(RefreshToken refreshToken);
}
