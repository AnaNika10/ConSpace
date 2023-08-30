#region

#endregion

using Microsoft.EntityFrameworkCore;
using User.Application.Contracts.Persistence;
using User.Domain.Entities;
using User.Infrastructure.Persistence;

namespace User.Infrastructure.Repositories;

public class NoteRepository : INoteRepository
{
    private readonly UserContext _context;
    private readonly ILogger<NoteRepository> _logger;

    public NoteRepository(UserContext context, ILogger<NoteRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<bool> CreateNote(Note note, Guid userId)
    {
        await _context.Notes.AddAsync(new Note(note.Title, note.Content, userId));
        _logger.LogInformation($"Creating note for user: {userId}");
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteNote(Guid id, Guid userId)
    {
        var note = await _context.Notes.SingleAsync(note => note.Id == id && note.UserId == userId);
        note.Deleted = true;
        _logger.LogInformation($"Deleting note with noteId: {note.Id} of user: {userId}");
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateNote(Note updatedNote, Guid userId)
    {
        var note = await _context.Notes.SingleAsync(note => note.Id == updatedNote.Id && note.UserId == userId);
        if (note.Deleted)
        {
            _logger.LogError($"Invalid operation. Attempted update of deleted note with noteId: {note.Id}");
            throw new InvalidProgramException();
        }

        note.Title = updatedNote.Title;
        note.Content = updatedNote.Content;
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<Note>> FindAll(Guid userId)
    {
        return await _context.Notes.Where(note => note.UserId == userId && !note.Deleted).ToListAsync();
    }

    public async Task<Note> FindOne(Guid id, Guid userId)
    {
        return await _context.Notes.Where(note => note.Id == id && note.UserId == userId && !note.Deleted)
            .FirstOrDefaultAsync();
    }
}