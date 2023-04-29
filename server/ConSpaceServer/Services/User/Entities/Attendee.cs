using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace User.Entities;

[Table("attendee")]
public class Attendee
{
    [Column("id")]
    [Key]
    public Guid Id { get; set; }
    
    [Column("name")]
    public string Name { get; set; }

    [Column("attendee_type")] 
    public AttendeeType Type { get; set; }
    
    // [Column("seminar_id")]
    // public Guid seminarId { get; set; }
    
    [Column("notes")]
    public IEnumerable<Note>? Notes { get; set; }

    public Attendee(Guid id, string name, AttendeeType type)
    {
        Id = id;
        Name = name;
        Type = type;
    }
}

public enum AttendeeType
{
    SPEAKER,
    ATTENDEE
}