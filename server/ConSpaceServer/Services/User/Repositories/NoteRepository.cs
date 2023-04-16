using Microsoft.EntityFrameworkCore;
using User.Data;
using User.DTO;
using User.Entities;

namespace User.Repositories;

public class NoteRepository : INoteRepository {
    
    private readonly UserContext _context;

    public NoteRepository(UserContext context
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }
    
    public async Task<bool> CreateNote(NoteDto note) {
        await _context.Notes.AddAsync(new Note(note.title, note.content));
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteNote(Guid id) {
        var note = await _context.Notes.SingleAsync(note => note.id == id);
        note.deleted = true;
        return await _context.SaveChangesAsync() > 0;
    }
    public async Task<bool> UpdateNote(NoteDto updatedNote) {
        var note = await _context.Notes.SingleAsync(note => note.id == updatedNote.id);
        if (note.deleted)
        {
            throw new InvalidProgramException();
        }

        note.Title = updatedNote.title;
        note.Content = updatedNote.content;
        return await _context.SaveChangesAsync() > 0;
    }
    public Task<IEnumerable<NoteDto>> FindAll() {
        throw new NotImplementedException();
    }

    public async Task<Note> FindOne(Guid id) {
        return await _context.Notes.Where(note => note.id==id && !note.deleted).FirstOrDefaultAsync();
    }
}