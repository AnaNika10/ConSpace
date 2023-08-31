#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Domain.Entities;

[Table("seminar")]
public class Seminar
{
    public Seminar()
    {
    }

    public Seminar(
        Guid id,
        Guid userId,
        List<string> speakers,
        List<int> speakerIds,
        string title,
        DateTimeOffset startDate,
        DateTimeOffset endDate,
        string location)
    {
        Id = id;
        UserId = userId;
        Speakers = speakers;
        SpeakerIds = speakerIds;
        Title = title;
        StartDate = startDate;
        EndDate = endDate;
        Location = location;
    }

    [Column("id")] [Key] public Guid Id { get; set; }

    [Column("user_id")] public Guid UserId { get; set; }

    [Column("speakers", TypeName = "text[]")]
    public List<string> Speakers { get; set; }

    [Column("speaker_ids", TypeName = "int[]")]
    public List<int> SpeakerIds { get; set; }

    [Column("title")] public string Title { get; set; }
    [Column("start_date_time")] public DateTimeOffset StartDate { get; set; }

    [Column("end_date_time")] public DateTimeOffset EndDate { get; set; }

    [Column("location")] public string Location { get; set; }

    public Attendee User { get; set; }
}