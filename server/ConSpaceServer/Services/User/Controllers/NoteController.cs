using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using User.DTO;
using User.Repositories;

namespace User.Controllers;

[ApiController]
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
    public void CreateNote(NoteDto note)
    {
        _repository.CreateNote(note);
    }

    [Route("[action]/{id}")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public void DeleteNote(Guid id)
    {
        _repository.DeleteNote(id);
    }

    [Route("[action]")]
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public void EditNote(NoteDto updatedNote)
    {
        _repository.UpdateNote(updatedNote);
    }

    [Route("[action]")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IEnumerable<NoteDto> GetNotes()
    {
        throw new NotImplementedException();
    }

    [Route("[action]/{id}")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public NoteDto GetNote(string id)
    {
        throw new NotImplementedException();
    }
}
