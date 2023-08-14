#region

using Common.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using User.API.Controllers.Authorization;
using User.Common.DTOs;
using User.Common.Repositories;

#endregion

namespace User.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = RolePolicy.SpeakerOrUser)]
public class ScheduleController : ControllerBase
{
    private readonly ILogger<ScheduleController> _logger;
    private readonly IScheduleRepository _scheduleRepository;

    public ScheduleController(ILogger<ScheduleController> logger, IScheduleRepository scheduleRepository)
    {
        _logger = logger;
        _scheduleRepository = scheduleRepository;
    }

    [Route("[action]")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> AddSeminarToSchedule(SeminarDto seminar)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _scheduleRepository.create(userId, seminar);
    }

    [Route("[action]/{seminarId}")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> DeleteSeminarFromSchedule(Guid seminarId)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _scheduleRepository.delete(userId, seminarId);
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IEnumerable<SeminarDto>> GetSchedule()
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        var result = await _scheduleRepository.getSchedule(userId);
        return result.Select(it =>
            new SeminarDto(
                    it.Id, 
                    it.Speakers, 
                    it.SpeakerIds,
                    it.Title,
                    it.StartDateTime.DateTime,
                    it.EndDateTime.DateTime,
                    it.Location
                ));
    }
}