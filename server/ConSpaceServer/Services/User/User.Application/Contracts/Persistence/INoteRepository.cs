#region

#endregion

using User.Domain.Entities;

namespace User.Application.Contracts.Persistence;

public interface INoteRepository
{
    Task<bool> CreateNote(Note note, Guid userId);
    Task<bool> DeleteNote(Guid id, Guid userId);
    Task<bool> UpdateNote(Note updatedNote, Guid userId);
    Task<IEnumerable<Note>> FindAll(Guid userId);
    Task<Note> FindOne(Guid id, Guid userId);
}