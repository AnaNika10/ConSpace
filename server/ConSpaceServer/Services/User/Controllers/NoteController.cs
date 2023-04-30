using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using User.Controllers.Authorization;
using User.DTO;
using User.Repositories;
using User.Entities;

namespace User.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class NoteController : ControllerBase
{

    private readonly ILogger<NoteController> _logger;
    private readonly INoteRepository _repository;

    public NoteController(ILogger<NoteController> logger, INoteRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [Route("[action]")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<ActionResult<bool>> CreateNote(NoteDto note)
    {
        Guid userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _repository.CreateNote(note, userId);
    }

    [Route("[action]/{id}")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteNote(Guid id)
    {
        Guid userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _repository.DeleteNote(id, userId);
    }

    [Route("[action]")]
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<ActionResult<bool>> EditNote(NoteDto updatedNote)
    {
        Guid userId = ClaimExtractor.ExtractUserId(User.Claims);
        return await _repository.UpdateNote(updatedNote, userId);
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes()
    {
        Guid userId = ClaimExtractor.ExtractUserId(User.Claims);
        var notes = await _repository.FindAll(userId);
        var result = new List<NoteDto>();
        foreach (var note in notes)
        {
            result.Add(new NoteDto(note.id, note.Title, note.Content));
        }
        return result;
    }

    [Route("[action]/{id}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<ActionResult<NoteDto>> GetNote(Guid id)
    {
        Guid userId = ClaimExtractor.ExtractUserId(User.Claims);
        Note note = await _repository.FindOne(id, userId);
        return new NoteDto(note.id, note.Title, note.Content);
    }
    
}
