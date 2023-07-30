namespace User.Common.DTOs;

public class NoteDto
{
    public NoteDto(
        Guid id,
        string title,
        string content
    )
    {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public Guid id { get; set; }
    public string title { get; set; }
    public string? content { get; set; }
}