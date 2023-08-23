using Common.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using User.API.Controllers.Authorization;
using User.Common.DTOs;
using User.Common.Extensions;
using User.Common.Repositories;

namespace User.API.Controllers;

[ApiController]
[Authorize(Policy = RolePolicy.SpeakerOrUser)]
[Route("api/[controller]")]
public class InvitesController : ControllerBase
{
    private readonly ILogger<InvitesController> _logger;
    private readonly IInvitesRepository _repository;
    
    public InvitesController(ILogger<InvitesController> logger, IInvitesRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<InviteDto>>> GetInvites()
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        var invites = await _repository.FindAll(userId);
        var result = new List<InviteDto>();
        foreach (var invite in invites)
            result.Add(new InviteDto(invite.id, invite.userId, invite.userName, invite.inviteeId,
                invite.inviteeName, invite.timestamp,
                EnumConversionExtension.mapToDto(invite.status)));
        return result;
    }
}