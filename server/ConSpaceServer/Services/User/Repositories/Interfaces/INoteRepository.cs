#region

using User.DTO;
using User.Entities;

#endregion

namespace User.Repositories;

public interface INoteRepository
{
    Task<bool> CreateNote(NoteDto note, Guid userId);
    Task<bool> DeleteNote(Guid id, Guid userId);
    Task<bool> UpdateNote(NoteDto updatedNote, Guid userId);
    Task<IEnumerable<Note>> FindAll(Guid userId);
    Task<Note> FindOne(Guid id, Guid userId);
}