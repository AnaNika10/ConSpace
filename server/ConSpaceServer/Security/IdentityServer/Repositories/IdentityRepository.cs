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
    public async Task<bool> CheckUserPassword(User user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
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
} 
