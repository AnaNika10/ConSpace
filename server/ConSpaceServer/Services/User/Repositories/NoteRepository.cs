using System;
using User.Data;
using User.DTO;
using Npgsql;

namespace User.Repositories;

public class NoteRepository : INoteRepository {
    
    private readonly IUserContext _context;
    // private readonly IMapper _mapper;

    public NoteRepository(IUserContext context
    // , IMapper mapper
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        // _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }
    
    public async void CreateNote(NoteDto note) {
        using var dataSource = _context.GetDataSource();
        await using (var cmd = dataSource.CreateCommand("INSERT INTO Notes (id, title, content, deleted) VALUES (@id, @title, @content, DEFAULT)" ))
        {
            cmd.Parameters.AddWithValue("id",note.id);
            cmd.Parameters.AddWithValue("title", note.title);
            cmd.Parameters.AddWithValue("content", note.content);
            await cmd.ExecuteNonQueryAsync();
        }
    }

    public void DeleteNote(string id) {

    }
    public void UpdateNote(NoteDto updatedNote) {
        
    }
    public Task<IEnumerable<NoteDto>> FindAll() {
        throw new NotImplementedException();
    }
    public Task<NoteDto> FindOne(string id) {
        throw new NotImplementedException();
    }
}