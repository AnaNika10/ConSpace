#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Domain.Entities;

[Table("reminders")]
public class Reminder
{
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Column("user_id")] public Guid UserId { get; set; }

    [Column("type")] public ReminderType Type { get; set; }

    [Column("timestamp")] public DateTimeOffset Timestamp { get; set; }

    [Column("content")] public string Content { get; set; }

    [Column("eventId")] public Guid EventId { get; set; }
}

public enum ReminderType
{
    MEET_UP,
    SEMINAR
}