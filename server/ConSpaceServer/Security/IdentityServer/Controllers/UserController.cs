using AutoMapper;
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

    [Authorize(Roles = "Administrator")]
    [HttpGet("[action]")]
    [ProducesResponseType(typeof(IEnumerable<UserDetails>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UserDetails>>> GetAllUsers()
    {
        var users = await _repository.GetAllUsers();
        return Ok(_mapper.Map<IEnumerable<UserDetails>>(users));
    }

    [Authorize(Roles = "Administrator,User")]
    [HttpGet]
    [ProducesResponseType(typeof(UserDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDetails>> GetUser()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _repository.GetUserByEmail(email);
        if (user != null)
        {
            return Ok(_mapper.Map<UserDetails>(user));
        }
        return NotFound();
    }
}