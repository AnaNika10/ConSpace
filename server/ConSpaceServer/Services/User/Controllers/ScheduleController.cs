using Microsoft.AspNetCore.Mvc;
using System;
using User.DTO;

namespace User.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ScheduleController : ControllerBase
{

    private readonly ILogger<ScheduleController> _logger;

    public ScheduleController(ILogger<ScheduleController> logger)
    {
        _logger = logger;
    }

    [Route("[action]")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public void AddSeminarToSchedule(SeminarDto seminar)
    {
        throw new NotImplementedException();
    }

    [Route("[action]")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public void DeleteSeminarFromSchedule(SeminarDto seminar)
    {
        throw new NotImplementedException();
    }
}
