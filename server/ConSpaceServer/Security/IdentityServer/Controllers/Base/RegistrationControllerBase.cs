using AutoMapper;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.GrpcServices;
using IdentityServer.Repositories;
using IdentityServer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IdentityServer.Controllers.Base;

public class RegistrationControllerBase : ControllerBase
{
    protected readonly ILogger<AuthenticationController> _logger;
    protected readonly IMapper _mapper;
    protected readonly IIdentityRepository _repository;
    protected readonly IAuthenticationService _authService;
    protected readonly UserGrpcService _userGrpcService;
    private ILogger<AuthenticationController> logger;
    private IMapper mapper;
    private IIdentityRepository repository;
    private IAuthenticationService authService;

    public RegistrationControllerBase(ILogger<AuthenticationController> logger, IMapper mapper, IIdentityRepository repository, IAuthenticationService authService, UserGrpcService userGrpcService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _authService = authService ?? throw new ArgumentNullException(nameof(authService));
        _userGrpcService = userGrpcService ?? throw new ArgumentNullException(nameof(userGrpcService));
    }

    protected async Task<IActionResult> RegisterNewUserWithRoles(NewUserDto newUser, IEnumerable<string> roles)
    {
        var user = _mapper.Map<UserEntity>(newUser);

        var result = await _repository.CreateUser(user, newUser.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.TryAddModelError(error.Code, error.Description);
            }

            return BadRequest(ModelState);
        }
        _logger.LogInformation($"Successfully registered user: {user.Email}.");

        foreach (var role in roles)
        {
            if (await _repository.AddRoleToUser(user, role))
            {
                _logger.LogInformation($"Added a role {role} to user: {user.Email}.");
            }
            else
            {
                _logger.LogInformation($"Role {role} does not exist.");
            }
        }

        return StatusCode(StatusCodes.Status201Created);
    }
}