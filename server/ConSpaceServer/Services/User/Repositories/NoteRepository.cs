#region

using Microsoft.EntityFrameworkCore;
using User.Data;
using User.DTO;
using User.Entities;

#endregion

namespace User.Repositories;

public class NoteRepository : INoteRepository
{
    private readonly UserContext _context;
    private readonly ILogger<NoteRepository> _logger;

    public NoteRepository(UserContext context, ILogger<NoteRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<bool> CreateNote(NoteDto note, Guid userId)
    {
        await _context.Notes.AddAsync(new Note(note.title, note.content, userId));
        _logger.LogInformation($"Creating note for user: {userId}");
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteNote(Guid id, Guid userId)
    {
        var note = await _context.Notes.SingleAsync(note => note.id == id && note.UserId == userId);
        note.deleted = true;
        _logger.LogInformation($"Deleting note with noteId: {note.id} of user: {userId}");
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateNote(NoteDto updatedNote, Guid userId)
    {
        var note = await _context.Notes.SingleAsync(note => note.id == updatedNote.id && note.UserId == userId);
        if (note.deleted)
        {
            _logger.LogError($"Invalid operation. Attempted update of deleted note with noteId: {note.id}");
            throw new InvalidProgramException();
        }

        note.Title = updatedNote.title;
        note.Content = updatedNote.content;
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<Note>> FindAll(Guid userId)
    {
        return await _context.Notes.Where(note => note.UserId == userId).ToListAsync();
    }

    public async Task<Note> FindOne(Guid id, Guid userId)
    {
        return await _context.Notes.Where(note => note.id == id && note.UserId == userId && !note.deleted)
            .FirstOrDefaultAsync();
    }
}