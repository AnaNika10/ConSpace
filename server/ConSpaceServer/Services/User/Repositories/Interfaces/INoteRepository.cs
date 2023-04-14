using System.Collections.Generic;
using System.Threading.Tasks;
using User.DTO;

namespace User.Repositories;

public interface INoteRepository {
    void CreateNote(NoteDto note);
    void DeleteNote(string id);
    void UpdateNote(NoteDto updatedNote);
    Task<IEnumerable<NoteDto>> FindAll();
    Task<NoteDto> FindOne(string id);
}