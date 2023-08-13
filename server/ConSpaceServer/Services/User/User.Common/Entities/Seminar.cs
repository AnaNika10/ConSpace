#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Common.Entities;

[Table("seminar")]
public class Seminar
{
    public Seminar(Guid id, Guid userId, List<string> speakers, string hall, DateTimeOffset dateTimeOfSeminar)
    {
        Id = id;
        UserId = userId;
        Speakers = speakers;
        Hall = hall;
        DateTimeOfSeminar = dateTimeOfSeminar;
    }

    [Column("id")] [Key] public Guid Id { get; set; }

    [Column("user_id")] public Guid UserId { get; set; }

    [Column("speakers", TypeName = "text[]")]
    public List<string> Speakers { get; set; }

    [Column("Hall")] public string Hall { get; set; }

    [Column("date_time_of_seminar")] public DateTimeOffset DateTimeOfSeminar { get; set; }

    public Attendee User { get; set; }
}