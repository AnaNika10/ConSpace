using System.Collections.Generic;
using System.Threading.Tasks;
using User.DTO;
using User.Entities;

namespace User.Repositories;

public interface INoteRepository {
    void CreateNote(NoteDto note);
    void DeleteNote(Guid id);
    void UpdateNote(NoteDto updatedNote);
    Task<IEnumerable<NoteDto>> FindAll();
    Task<Note> FindOne(Guid id);
}