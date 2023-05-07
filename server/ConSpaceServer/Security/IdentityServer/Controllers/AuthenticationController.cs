﻿using AutoMapper;
using IdentityServer.Controllers.Base;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Services;
using IdentityServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using Common.Security;

namespace IdentityServer.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class AuthenticationController : RegistrationControllerBase
{
    public AuthenticationController(ILogger<AuthenticationController> logger, IMapper mapper, IIdentityRepository repository, IAuthenticationService authService) 
        : base(logger, mapper, repository, authService)
    {
    }

    [HttpPost("[action]")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RegisterUser([FromBody] NewUserDto newUser)
    {
        return await RegisterNewUserWithRoles(newUser, new string[] { Roles.USER });
    }

    [HttpPost("[action]")]
    [ProducesResponseType(typeof(AuthenticationModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] UserCredentialsDto userCredentials)
    {
        var user = await _authService.ValidateUser(userCredentials);
        if (user == null)
        {
            _logger.LogWarning($"{nameof(Login)}: Authentication failed. Wrong email or password.");
            return Unauthorized();
        }

        return Ok(await _authService.CreateAuthenticationModel(user));
    }

    [HttpPost("[action]")]
    [ProducesResponseType(typeof(AuthenticationModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<AuthenticationModel>> Refresh([FromBody] RefreshTokenModel refreshTokenCredentials)
    {
        var user = await _repository.GetUserByEmail(refreshTokenCredentials.Email);
        if (user == null)
        {
            _logger.LogWarning($"{nameof(Refresh)}: Refreshing token failed. Unknown email {refreshTokenCredentials.Email}.");
            return Forbid();
        }

        var refreshToken = user.RefreshTokens.FirstOrDefault(r => r.Token == refreshTokenCredentials.RefreshToken);
        if (refreshToken == null)
        {
            _logger.LogWarning($"{nameof(Refresh)}: Refreshing token failed. The refresh token is not found.");
            return Unauthorized();
        }

        if (refreshToken.ExpiryTime < DateTime.Now)
        {
            _logger.LogWarning($"{nameof(Refresh)}: Refreshing token failed. The refresh token is not valid.");
            return Unauthorized();
        }

        return Ok(await _authService.CreateAuthenticationModel(user));
    }

    [Authorize]
    [HttpPost("[action]")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenModel refreshTokenCredentials)
    {
        var user = await _repository.GetUserByEmail(refreshTokenCredentials.Email);
        if (user == null)
        {
            _logger.LogWarning($"{nameof(Logout)}: Logout failed. Unknown email {refreshTokenCredentials.Email}.");
            return Forbid();
        }

        await _authService.RemoveRefreshToken(user, refreshTokenCredentials.RefreshToken);

        return Accepted();
    }
}