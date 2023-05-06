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

namespace IdentityServer.Repositories;

public class IdentityRepository : IIdentityRepository
{
    private readonly IdentityContext _dbContext;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public IdentityRepository(IdentityContext dbContext, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
    }

    public async Task<IdentityResult> CreateUser(User user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }
    public async Task<IdentityResult> UpdateUser(User user)
    {
        return await _userManager.UpdateAsync(user);
    }
    public async Task DeleteUser(User user)
    {
        await _userManager.DeleteAsync(user);
    }
    public async Task UpdateUserName(User user, string firstName, string lastName)
    {
        user.FirstName = firstName;
        user.LastName = lastName;
        await _userManager.UpdateAsync(user);
    }

    public async Task<bool> UpdateUserPassword(User user, string currentPassword, string newPassword)
    {
        var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        return result.Succeeded;
    }
    public async Task<bool> CheckUserPassword(User user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }
    public async Task<bool> AddRoleToUser(User user, string role)
    {
        var roleExists = await _roleManager.RoleExistsAsync(role);

        if (!roleExists)
            return false;

        await _userManager.AddToRoleAsync(user, role);
        return true;
    }
    public async Task<IEnumerable<string>> GetUserRoles(User user)
    {
        return await _userManager.GetRolesAsync(user);
    }
    public async Task<User?> GetUserByEmail(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await _userManager.Users.ToListAsync();
    }
    public async Task<(int, IEnumerable<User>)> GetUsers(string searchString, int page, int pageSize)
    {
        var customerRole = await _roleManager.FindByNameAsync("User");

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

    public async Task<(int, IEnumerable<User>)> GetSpeakers(string searchString, int page, int pageSize)
    {
        var customerRole = await _roleManager.FindByNameAsync("Speaker");

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

    public async Task<(int, IEnumerable<User>)> GetAdministrators(string searchString, int page, int pageSize)
    {
        var administratorRole = await _roleManager.FindByNameAsync("Administrator");

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
