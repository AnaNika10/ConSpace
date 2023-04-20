using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using User.DTO;
using User.Repositories;
using User.Entities;
using Microsoft.AspNetCore.Mvc.Core;

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
    public async Task<ActionResult<bool>> CreateNote(NoteDto note)
    {
        var userId= User.Claims.FirstOrDefault(x => 
            x.Type.Equals(ClaimTypes.NameIdentifier, StringComparison.OrdinalIgnoreCase)
            )
            ?.Value;
        if (userId==null)
        {
            throw new Exception("Can't retrieve user claims"); 
        }
        return await _repository.CreateNote(note, Guid.Parse(userId));
    }

    [Route("[action]/{id}")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<bool>> DeleteNote(Guid id)
    {
        return await _repository.DeleteNote(id);
    }

    [Route("[action]")]
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<bool>> EditNote(NoteDto updatedNote)
    {
        return await _repository.UpdateNote(updatedNote);
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [Authorize]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes()
    {
        var userId= User.Claims.FirstOrDefault(x => 
                x.Type.Equals(ClaimTypes.NameIdentifier, StringComparison.OrdinalIgnoreCase)
            )
            ?.Value;
        if (userId==null)
        {
            throw new Exception("Can't retrieve user claims"); 
        }

        var notes = await _repository.FindAll(Guid.Parse(userId));
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
    public async Task<ActionResult<NoteDto>> GetNote(Guid id)
    {
        Note note = await _repository.FindOne(id);
        return new NoteDto(note.id, note.Title, note.Content);
    }
}
