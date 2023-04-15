using Microsoft.AspNetCore.Mvc;
using User.DTO;

namespace User.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InternalController : ControllerBase
{

    private readonly ILogger<InternalController> _logger;

    public InternalController(ILogger<InternalController> logger)
    {
        _logger = logger;
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IEnumerable<ReminderDto> ListAllReminders(ReminderType typeFilter)
    {
        throw new NotImplementedException();
    }

    [Route("[action]/{id}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    // returns list of reminders for a specific seminar or meet up
    public IEnumerable<ReminderDto> GetRemindersByEventId(string id)
    {
        throw new NotImplementedException();
    }
}
