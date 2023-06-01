using IdentityServer.Data;
using IdentityServer.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Common.Security;

namespace IdentityServer.Repositories;

public class IdentityRepository : IIdentityRepository
{
    private readonly IdentityContext _dbContext;
    private readonly UserManager<UserEntity> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public IdentityRepository(IdentityContext dbContext, UserManager<UserEntity> userManager, RoleManager<IdentityRole> roleManager)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
    }

    public async Task<IdentityResult> CreateUser(UserEntity user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }
    public async Task<IdentityResult> UpdateUser(UserEntity user)
    {
        return await _userManager.UpdateAsync(user);
    }
    public async Task DeleteUser(UserEntity user)
    {
        await _userManager.DeleteAsync(user);
    }
    public async Task UpdateUserName(UserEntity user, string firstName, string lastName)
    {
        user.FirstName = firstName;
        user.LastName = lastName;
        await _userManager.UpdateAsync(user);
    }

    public async Task<bool> UpdateUserPassword(UserEntity user, string currentPassword, string newPassword)
    {
        var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        return result.Succeeded;
    }
    public async Task<bool> CheckUserPassword(UserEntity user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }
    public async Task<bool> AddRoleToUser(UserEntity user, string role)
    {
        var roleExists = await _roleManager.RoleExistsAsync(role);

        if (!roleExists)
            return false;

        await _userManager.AddToRoleAsync(user, role);
        return true;
    }
    public async Task<IEnumerable<string>> GetUserRoles(UserEntity user)
    {
        return await _userManager.GetRolesAsync(user);
    }
    public async Task<UserEntity?> GetUserByEmail(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }
    public async Task<IEnumerable<UserEntity>> GetAllUsers()
    {
        return await _userManager.Users.ToListAsync();
    }
    public async Task<(int, IEnumerable<UserEntity>)> GetUsers(string searchString, int page, int pageSize)
    {
        var customerRole = await _roleManager.FindByNameAsync(Roles.USER);

        var count = await _dbContext.UserRoles
            .Where(ur => ur.RoleId == customerRole.Id)
            .Join(_dbContext.Users.AsQueryable(), ur => ur.UserId, u => u.Id, (ur, u) => u)
            .Where(u => u.Email.Contains(searchString))
            .CountAsync();

        var users = await _dbContext.UserRoles
            .Where(ur => ur.RoleId == customerRole.Id)
            .Join(_dbContext.Users.AsQueryable(), ur => ur.UserId, u => u.Id, (ur, u) => u)
            .Where(u => u.Email.Contains(searchString))
            .OrderBy(u => u.Email)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (count, users);
    }

    public async Task<(int, IEnumerable<UserEntity>)> GetSpeakers(string searchString, int page, int pageSize)
    {
        var customerRole = await _roleManager.FindByNameAsync(Roles.SPEAKER);

        var count = await _dbContext.UserRoles
            .Where(ur => ur.RoleId == customerRole.Id)
            .Join(_dbContext.Users.AsQueryable(), ur => ur.UserId, u => u.Id, (ur, u) => u)
            .Where(u => u.Email.Contains(searchString))
            .CountAsync();

        var users = await _dbContext.UserRoles
            .Where(ur => ur.RoleId == customerRole.Id)
            .Join(_dbContext.Users.AsQueryable(), ur => ur.UserId, u => u.Id, (ur, u) => u)
            .Where(u => u.Email.Contains(searchString))
            .OrderBy(u => u.Email)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (count, users);
    }

    public async Task<(int, IEnumerable<UserEntity>)> GetAdministrators(string searchString, int page, int pageSize)
    {
        var administratorRole = await _roleManager.FindByNameAsync(Roles.ADMINISTRATOR);

        var count = await _dbContext.UserRoles
            .Where(ur => ur.RoleId == administratorRole.Id)
            .Join(_dbContext.Users.AsQueryable(), ur => ur.UserId, u => u.Id, (ur, u) => u)
            .Where(u => u.Email.Contains(searchString))
            .CountAsync();

        var users = await _dbContext.UserRoles
            .Where(ur => ur.RoleId == administratorRole.Id)
            .Join(_dbContext.Users.AsQueryable(), ur => ur.UserId, u => u.Id, (ur, u) => u)
            .Where(u => u.Email.Contains(searchString))
            .OrderBy(u => u.Email)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (count, users);
    }
    public async Task CreateRefreshToken(RefreshToken refreshToken)
    {
        _dbContext.RefreshTokens.Add(refreshToken);
        await _dbContext.SaveChangesAsync();
    }
    public async Task<RefreshToken?> FindRefreshToken(string refreshToken)
    {
        return await _dbContext.RefreshTokens.SingleOrDefaultAsync(t => t.Token == refreshToken);
    }
    public async Task DeleteRefreshToken(RefreshToken refreshToken)
    {
        _dbContext.RefreshTokens.Remove(refreshToken);
        await _dbContext.SaveChangesAsync();
    }
    public async Task DeleteAllRefreshTokens()
    {
        await _dbContext.Database.ExecuteSqlRawAsync("TRUNCATE TABLE RefreshTokens");
    }
} 
