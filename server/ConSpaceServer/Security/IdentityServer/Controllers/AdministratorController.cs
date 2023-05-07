using AutoMapper;
using IdentityServer.Controllers.Base;
using IdentityServer.DTOs;
using IdentityServer.Repositories;
using IdentityServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Common.Security;
using System.Collections.Generic;
using System.Data;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityServer.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize(Roles = Roles.ADMINISTRATOR)]
public class AdministratorController : RegistrationControllerBase
{
    public AdministratorController(ILogger<AuthenticationController> logger, IMapper mapper, IIdentityRepository repository, IAuthenticationService authService) 
        : base(logger, mapper, repository, authService)
    {
    }

    [HttpPost("[action]")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RegisterAdministrator([FromBody] NewUserDto newUser)
    {
        return await RegisterNewUserWithRoles(newUser, new string[] { Roles.ADMINISTRATOR });
    }

    [HttpPost("[action]")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RegisterSpeaker([FromBody] NewUserDto newUser)
    {
        return await RegisterNewUserWithRoles(newUser, new string[] { Roles.SPEAKER });
    }

    [HttpGet("[action]")]
    [ProducesResponseType(typeof(IEnumerable<UserDetails>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UserDetails>>> GetAllUsers()
    {
        var users = await _repository.GetAllUsers();
        return Ok(_mapper.Map<IEnumerable<UserDetails>>(users));
    }

    [HttpGet("[action]")]
    [ProducesResponseType(typeof(PaginatedUserResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedUserResponse>> GetUsers([FromQuery] string? searchString, [FromQuery] PaginationRequest pagination)
    {
        var (count, users) = await _repository.GetUsers(searchString ?? "", pagination.Page, pagination.PerPage);
        return Ok(new PaginatedUserResponse
        {
            Count = count,
            Users = _mapper.Map<IEnumerable<UserDetails>>(users)
        });
    }

    [HttpGet("[action]")]
    [ProducesResponseType(typeof(PaginatedUserResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedUserResponse>> GetSpeakers([FromQuery] string? searchString, [FromQuery] PaginationRequest pagination)
    {
        var (count, users) = await _repository.GetSpeakers(searchString ?? "", pagination.Page, pagination.PerPage);
        return Ok(new PaginatedUserResponse
        {
            Count = count,
            Users = _mapper.Map<IEnumerable<UserDetails>>(users)
        });
    }

    [HttpGet("[action]")]
    [ProducesResponseType(typeof(PaginatedUserResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedUserResponse>> GetAdministrators([FromQuery] string? searchString, [FromQuery] PaginationRequest pagination)
    {
        var (count, users) = await _repository.GetAdministrators(searchString ?? "", pagination.Page, pagination.PerPage);
        return Ok(new PaginatedUserResponse
        {
            Count = count,
            Users = _mapper.Map<IEnumerable<UserDetails>>(users)
        });
    }

    [HttpGet("[action]/{email}")]
    [ProducesResponseType(typeof(UserDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetUserByEmail(string email)
    {
        var user = await _repository.GetUserByEmail(email);
        if (user != null)
        {
            return Ok(_mapper.Map<UserDetails>(user));
        }
        return NotFound();
    }

    [HttpGet("[action]/{email}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteUserByEmail(string email)
    {
        var user = await _repository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound();
        }

        if (user.Email == User.FindFirstValue(ClaimTypes.Email))
        {
            return BadRequest("Administrator can't delete his account");
        }

        await _repository.DeleteUser(user!);
        return Ok();
    }

    [HttpPost("[action]")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> RevokeAllTokens()
    {
        await _authService.RevokeAllRefreshTokens();
        return Ok();
    }
}
