namespace User.API.DTOs;

public class ReminderDto
{
    public ReminderDto(
        Guid id,
        ReminderType type,
        DateTimeOffset timestamp,
        string content,
        Guid eventId
    )
    {
        Id = id;
        Type = type;
        Timestamp = timestamp;
        Content = content;
        EventId = eventId;
    }

    public Guid Id { get; set; }
    public ReminderType Type;
    public DateTimeOffset Timestamp { get; set; }
    public string Content { get; set; }

    public Guid EventId { get; set; }
}

public enum ReminderType
{
    SEMINAR,
    MEET_UP
}