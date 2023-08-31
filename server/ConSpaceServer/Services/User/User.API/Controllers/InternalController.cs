#region

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using User.API.DTOs;
using User.Application.Contracts.Persistence;
using User.Domain.Entities;
using ReminderType = User.Domain.Entities.ReminderType;
using ReminderTypeDTO = User.API.DTOs.ReminderType;

#endregion

namespace User.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InternalController : ControllerBase
{
    private readonly IAttendeeRepository _attendeesRepository;
    private readonly ILogger<InternalController> _logger;
    private readonly IRemindersRepository _remindersRepository;
    private readonly IMapper _mapper;

    public InternalController(
        ILogger<InternalController> logger,
        IRemindersRepository remindersRepository,
        IAttendeeRepository attendeeRepository,
        IMapper mapper
    )
    {
        _logger = logger;
        _remindersRepository = remindersRepository;
        _attendeesRepository = attendeeRepository;
        _mapper = mapper;
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<ReminderDto>>> ListAllReminders(ReminderTypeDTO typeFilter)
    {
        var reminders = await _remindersRepository.findAllFilterByType(_mapper.Map<ReminderType>(typeFilter));

        return MapToDto(reminders);
    }

    [Route("[action]/{userId}/{eventId}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    // returns list of reminders for a specific seminar or meet up
    public async Task<ActionResult<IEnumerable<ReminderDto>>> GetRemindersByEventId(Guid userId, Guid eventId)
    {
        var reminders = await _remindersRepository.findByEventId(userId, eventId);

        return MapToDto(reminders);
    }

    [Route("[action]/{userId}/{type}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    // returns list of reminders for a specific seminar or meet up
    public async Task<ActionResult<IEnumerable<ReminderDto>>> GetRemindersByType(Guid userId, ReminderTypeDTO type)
    {
        var reminders = await _remindersRepository.findByType(userId, _mapper.Map<ReminderType>(type));

        return MapToDto(reminders);
    }

    private List<ReminderDto> MapToDto(IEnumerable<Reminder> reminders)
    {
        var response = new List<ReminderDto>();
        foreach (var reminder in reminders)
            response.Add(
                new ReminderDto(
                    reminder.Id,
                    _mapper.Map<ReminderTypeDTO>(reminder.Type),
                    reminder.Timestamp,
                    reminder.Content,
                    reminder.EventId)
            );

        return response;
    }
}