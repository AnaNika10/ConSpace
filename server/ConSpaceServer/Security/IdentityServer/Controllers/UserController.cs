using AutoMapper;
using Common.Security;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityServer.Controllers;

[Authorize]
[Route("api/v1/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IIdentityRepository _repository;

    public UserController(IMapper mapper, IIdentityRepository repository)
    {
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    }

    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(UserDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDetails>> GetUser()
    {
        var email = User.FindFirstValue(CustomClaimTypes.Email);
        var user = await _repository.GetUserByEmail(email);
        if (user != null)
        {
            return Ok(_mapper.Map<UserDetails>(user));
        }
        return NotFound();
    }

    [Authorize(Policy = RolePolicy.USER)]
    [HttpPut("[action]")]
    [ProducesResponseType(typeof(UserDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDetails>> UpdateName([FromBody] UpdateNameDto newName)
    {
        var email = User.FindFirstValue(CustomClaimTypes.Email);
        var user = await _repository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound();
        }

        await _repository.UpdateUserName(user, newName.FirstName, newName.LastName);
        return Ok(_mapper.Map<UserDetails>(user));
    }

    [Authorize]
    [HttpPut("[action]")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDetails>> UpdatePassword([FromBody] UpdatePasswordDto request)
    {
        if (request.CurrentPassword == request.NewPassword)
        {
            ModelState.TryAddModelError(nameof(request.NewPassword), "New password can't be the same as old password");
            return ValidationProblem();
        }

        var email = User.FindFirstValue(CustomClaimTypes.Email);
        var user = await _repository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound();
        }

        var changed = await _repository.UpdateUserPassword(user, request.CurrentPassword, request.NewPassword);
        if (changed)
            return Ok();
        else
            return Unauthorized();
    }

    [Authorize(Policy = RolePolicy.USER)]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> DeleteUser()
    {
        var email = User.FindFirstValue(CustomClaimTypes.Email);
        var user = await _repository.GetUserByEmail(email);
        if (user != null)
        {
            await _repository.DeleteUser(user);
        }
        return Ok();
    }
}