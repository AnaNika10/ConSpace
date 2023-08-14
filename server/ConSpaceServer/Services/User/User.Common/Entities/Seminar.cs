#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Common.Entities;

[Table("seminar")]
public class Seminar
{
    public Seminar(
        Guid id,
        Guid userId,
        List<string> speakers,
        List<int> speakerIds,
        string title,
        DateTimeOffset startDateTime,
        DateTimeOffset endDateTime,
        string location)
    {
        Id = id;
        UserId = userId;
        Speakers = speakers;
        SpeakerIds = speakerIds;
        Title = title;
        StartDateTime = startDateTime;
        EndDateTime = endDateTime;
        Location = location;
    }

    [Column("id")] [Key] public Guid Id { get; set; }

    [Column("user_id")] public Guid UserId { get; set; }

    [Column("speakers", TypeName = "text[]")]
    public List<string> Speakers { get; set; }
    
    [Column("speaker_ids", TypeName = "int[]")]
    public List<int> SpeakerIds { get; set; }
    [Column("title")] public string Title { get; set; }
    [Column("start_date_time")] public DateTimeOffset StartDateTime { get; set; }

    [Column("end_date_time")] public DateTimeOffset EndDateTime { get; set; }

    [Column("location")] public string Location { get; set; }

    public Attendee User { get; set; }
}