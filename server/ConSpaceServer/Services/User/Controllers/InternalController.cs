using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using User.Controllers.Authorization;
using User.DTO;
using User.Entities;
using User.Extensions;
using User.Repositories;
using ReminderType = User.DTO.ReminderType;

namespace User.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InternalController : ControllerBase
{

    private readonly ILogger<InternalController> _logger;
    private readonly IRemindersRepository _remindersRepository;
    private readonly IAttendeeRepository _attendeesRepository;

    public InternalController(
        ILogger<InternalController> logger, 
        IRemindersRepository remindersRepository,
        IAttendeeRepository attendeeRepository)
    {
        _logger = logger;
        _remindersRepository = remindersRepository;
        _attendeesRepository = attendeeRepository;
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<ActionResult<IEnumerable<ReminderDto>>> ListAllReminders(ReminderType typeFilter)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        var reminders = await _remindersRepository.findAll(userId); 
        
        return MapToDto(reminders);
    }

    [Route("[action]/{eventId}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    // returns list of reminders for a specific seminar or meet up
    public async Task<ActionResult<IEnumerable<ReminderDto>>> GetRemindersByEventId(Guid eventId)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        var reminders = await _remindersRepository.findByEventId(userId, eventId);
        
        return MapToDto(reminders);
    }
    
    [Route("[action]/{type}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    // returns list of reminders for a specific seminar or meet up
    public async Task<ActionResult<IEnumerable<ReminderDto>>> GetRemindersByType(ReminderType type)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        var reminders = await _remindersRepository.findByType(userId, type);

        return MapToDto(reminders);
    }
    
    [Route("[action]")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> CreateUser(AttendeeDto attendee)
    {
        return await _attendeesRepository.create(attendee);
    }

    private List<ReminderDto> MapToDto(IEnumerable<Reminder> reminders)
    {
        var response = new List<ReminderDto>();
        foreach (var reminder in reminders)
        {
            response.Add(
                new ReminderDto(
                    reminder.id, 
                    EnumConversionExtension.mapToDto(reminder.type), 
                    reminder.timestamp, 
                    reminder.content,
                    reminder.eventId)
            );
        }

        return response;
    }
}
