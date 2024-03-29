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
[Authorize(Policy = RolePolicy.SpeakerOrUser)]
[Route("api/[controller]")]
public class NoteController : ControllerBase
{
    private readonly ILogger<NoteController> _logger;
    private readonly INoteRepository _repository;
    private readonly IMapper _mapper;

    public NoteController(ILogger<NoteController> logger, INoteRepository repository, IMapper mapper)
    {
        _logger = logger;
        _repository = repository;
        _mapper = mapper;
    }

    [Route("[action]")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> CreateNote(NoteDto note)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _repository.CreateNote(_mapper.Map<Note>(note), userId);
    }

    [Route("[action]/{id}")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> DeleteNote(Guid id)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _repository.DeleteNote(id, userId);
    }

    [Route("[action]")]
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> EditNote(NoteDto updatedNote)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _repository.UpdateNote(_mapper.Map<Note>(updatedNote), userId);
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes()
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        var notes = await _repository.FindAll(userId);
        var result = new List<NoteDto>();
        foreach (var note in notes) result.Add(new NoteDto(note.Id, note.Title, note.Content));
        return result;
    }

    [Route("[action]/{id}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<NoteDto>> GetNote(Guid id)
    {
        var userId = ClaimExtractor.ExtractUserId(User.Claims);
        var note = await _repository.FindOne(id, userId);
        return new NoteDto(note.Id, note.Title, note.Content);
    }
}