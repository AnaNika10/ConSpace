namespace User.Common.DTOs;

public class SeminarDto
{
    public SeminarDto()
    {
        speakers = new List<string>();
    }
    public SeminarDto(
        Guid id,
        List<string> speakers,
        List<Guid> speakerIds,
        int conferenceRoomId,
        String title,
        DateTime startDate,
        DateTime endDate,
        String location
    )
    {
        this.id = id;
        this.speakers = speakers;
        this.speakerIds = speakerIds;
        this.conferenceRoomId = conferenceRoomId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
    }

    public Guid id { get; set; }
    public List<string> speakers { get; set; }
    public List<Guid> speakerIds { get; set; }
    public int conferenceRoomId { get; set; }
    public String title { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    public String location { get; set; }
}