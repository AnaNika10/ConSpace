using System.Collections.Generic;
using System.Threading.Tasks;
using User.DTO;
using User.Entities;

namespace User.Repositories;

public interface INoteRepository {
    Task<bool> CreateNote(NoteDto note);
    Task<bool> DeleteNote(Guid id);
    Task<bool> UpdateNote(NoteDto updatedNote);
    Task<IEnumerable<NoteDto>> FindAll();
    Task<Note> FindOne(Guid id);
}