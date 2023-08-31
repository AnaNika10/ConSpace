#region

using AutoMapper;
using Common.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using User.API.Controllers.Authorization;
using User.API.DTOs;
using User.Application.Contracts.Persistence;
using User.Domain.Entities;

#endregion

namespace User.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = RolePolicy.SpeakerOrUser)]
public class ScheduleController : ControllerBase
{
    private readonly ILogger<ScheduleController> _logger;
    private readonly IScheduleRepository _scheduleRepository;
    private readonly IMapper _mapper;

    public ScheduleController(ILogger<ScheduleController> logger, IScheduleRepository scheduleRepository,
        IMapper mapper)
    {
        _logger = logger;
        _scheduleRepository = scheduleRepository;
        _mapper = mapper;
    }

    [Route("[action]")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> AddSeminarToSchedule(SeminarDto seminar)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _scheduleRepository.create(userId, _mapper.Map<Seminar>(seminar));
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
                it.StartDate.DateTime,
                it.EndDate.DateTime,
                it.Location
            ));
    }
}