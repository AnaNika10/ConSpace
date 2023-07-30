#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Common.Entities;

[Table("seminar")]
public class Seminar
{
    public Seminar(Guid id, Guid userId, List<string> speakers, Guid conferenceRoomId, DateTimeOffset dateTimeOfSeminar)
    {
        Id = id;
        UserId = userId;
        Speakers = speakers;
        ConferenceRoomId = conferenceRoomId;
        DateTimeOfSeminar = dateTimeOfSeminar;
    }

    [Column("id")] [Key] public Guid Id { get; set; }

    [Column("user_id")] public Guid UserId { get; set; }

    [Column("speakers", TypeName = "text[]")]
    public List<string> Speakers { get; set; }

    [Column("conference_room_id")] public Guid ConferenceRoomId { get; set; }

    [Column("date_time_of_seminar")] public DateTimeOffset DateTimeOfSeminar { get; set; }

    public Attendee User { get; set; }
}