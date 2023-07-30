namespace User.Common.DTOs;

public class ReminderDto
{
    public ReminderType type;

    public ReminderDto(
        Guid id,
        ReminderType type,
        DateTimeOffset timestamp,
        string content,
        Guid eventId
    )
    {
        this.id = id;
        this.type = type;
        this.timestamp = timestamp;
        this.content = content;
        this.eventId = eventId;
    }

    public Guid id { get; set; }
    public DateTimeOffset timestamp { get; set; }
    public string content { get; set; }

    public Guid eventId { get; set; }
}

public enum ReminderType
{
    SEMINAR,
    MEET_UP
}