using IdentityServer.Entities;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Repositories;

public interface IIdentityRepository
{
    Task<IdentityResult> CreateUser(UserEntity user, string password);
    Task<IdentityResult> UpdateUser(UserEntity user);
    Task DeleteUser(UserEntity user);
    Task UpdateUserName(UserEntity user, string firstName, string lastName);
    Task<bool> UpdateUserPassword(UserEntity user, string currentPassword, string newPassword);
    Task<bool> CheckUserPassword(UserEntity user, string password);
    Task<bool> AddRoleToUser(UserEntity user, string role);
    Task<IEnumerable<string>> GetUserRoles(UserEntity user);
    Task<UserEntity?> GetUserByEmail(string email);
    Task<IEnumerable<UserEntity>> GetAllUsers();
    Task<(int, IEnumerable<UserEntity>)> GetUsers(string searchString, int page, int pageSize);
    Task<(int, IEnumerable<UserEntity>)> GetSpeakers(string searchString, int page, int pageSize);
    Task<(int, IEnumerable<UserEntity>)> GetAdministrators(string searchString, int page, int pageSize);
    Task CreateRefreshToken(RefreshToken refreshToken);
    Task<RefreshToken?> FindRefreshToken(string refreshToken);
    Task DeleteRefreshToken(RefreshToken refreshToken);
    Task DeleteAllRefreshTokens();
}
