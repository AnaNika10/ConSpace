using IdentityServer.Data;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Common.Security;

namespace IdentityServer.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly ILogger<AuthenticationService> _logger;
    private readonly IConfiguration _configuration;
    private readonly IIdentityRepository _repository;

    public AuthenticationService(ILogger<AuthenticationService> logger, IConfiguration configuration, IIdentityRepository repository)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    }

    public async Task<User> ValidateUser(UserCredentialsDto userCredentials)
    {
        var user = await _repository.GetUserByEmail(userCredentials.Email);
        if (user == null || !await _repository.CheckUserPassword(user, userCredentials.Password))
        {
            return null;
        }
        return user;
    }

    public async Task<AuthenticationModel> CreateAuthenticationModel(User user)
    {
        var accessToken = await CreateAccessToken(user);
        var refreshToken = await CreateRefreshToken();

        user.RefreshTokens.Add(refreshToken);
        await _repository.UpdateUser(user);

        return new AuthenticationModel { AccessToken = accessToken, RefreshToken = refreshToken.Token };
    }

    private async Task<string> CreateAccessToken(User user)
    {
        var signingCredentials = GetSigningCredentials();
        var claims = await GetClaims(user);
        var token = GenerateToken(signingCredentials, claims);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private SigningCredentials GetSigningCredentials()
    {
        var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JwtSettings:secretKey"));
        var secret = new SymmetricSecurityKey(key);

        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    private async Task<IEnumerable<Claim>> GetClaims(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(CustomClaimTypes.Id, user.Id),
            new Claim(CustomClaimTypes.Email, user.Email),
            new Claim(CustomClaimTypes.Name, user.FirstName),
            new Claim(CustomClaimTypes.Surname, user.LastName)
        };

        var roles = await _repository.GetUserRoles(user);
        foreach (var role in roles)
        {
            claims.Add(new Claim(CustomClaimTypes.Role, role));
        }

        return claims;
    }

    private JwtSecurityToken GenerateToken(SigningCredentials signingCredentials, IEnumerable<Claim> claims)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");

        var token = new JwtSecurityToken
        (
            issuer: jwtSettings.GetSection("validIssuer").Value,
            audience: jwtSettings.GetSection("validAudience").Value,
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
            signingCredentials: signingCredentials
        );

        return token;
    }

    private async Task<RefreshToken> CreateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        var token = new RefreshToken
        {
            Token = Convert.ToBase64String(randomNumber),
            ExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(_configuration.GetValue<string>("RefreshTokenExpires")))
        };

        await _repository.CreateRefreshToken(token);

        return token;
    }

    public async Task RemoveRefreshToken(User user, string refreshToken)
    {
        user.RefreshTokens.RemoveAll(r => r.Token == refreshToken);
        await _repository.UpdateUser(user);

        var token = await _repository.FindRefreshToken(refreshToken);
        if (token == null)
        {
            return;
        }

        await _repository.DeleteRefreshToken(token);
    }

    public async Task RevokeAllRefreshTokens()
    {
        await _repository.DeleteAllRefreshTokens();
    }
}