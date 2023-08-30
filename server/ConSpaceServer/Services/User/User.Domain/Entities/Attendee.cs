#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Domain.Entities;

[Table("attendee")]
public class Attendee
{
    public Attendee(Guid id, string name, AttendeeType type, string email)
    {
        Id = id;
        Name = name;
        Type = type;
        Email = email;
    }

    [Column("id")] [Key] public Guid Id { get; set; }

    [Column("name")] public string Name { get; set; }

    [Column("attendee_type")] public AttendeeType Type { get; set; }

    [Column("seminars")] public IEnumerable<Seminar>? Seminars { get; set; }

    [Column("notes")] public IEnumerable<Note>? Notes { get; set; }
    [Column("email")] public string Email { get; set; }
}

public enum AttendeeType
{
    SPEAKER,
    ATTENDEE
}