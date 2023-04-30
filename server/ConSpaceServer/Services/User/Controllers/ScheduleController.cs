using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using User.Controllers.Authorization;
using User.DTO;
using User.Repositories;

namespace User.Controllers;

[ApiController]
[Route("api/[controller]")]
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
    [Authorize]
    public async Task<ActionResult<bool>> AddSeminarToSchedule(SeminarDto seminar)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _scheduleRepository.create(userId, seminar);
    }

    [Route("[action]")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteSeminarFromSchedule(Guid seminarId)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _scheduleRepository.delete(userId, seminarId);
    }
}