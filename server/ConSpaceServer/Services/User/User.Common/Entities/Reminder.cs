#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Common.Entities;

[Table("reminders")]
public class Reminder
{
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid id { get; set; }

    [Column("user_id")] public Guid userId { get; set; }

    [Column("type")] public ReminderType type { get; set; }

    [Column("timestamp")] public DateTimeOffset timestamp { get; set; }

    [Column("content")] public string content { get; set; }

    [Column("eventId")] public Guid eventId { get; set; }
}

public enum ReminderType
{
    MEET_UP,
    SEMINAR
}