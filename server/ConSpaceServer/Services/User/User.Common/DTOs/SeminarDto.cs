namespace User.Common.DTOs;

public class SeminarDto
{
    public SeminarDto(
        Guid id,
        List<string> speakers,
        Guid conferenceRoomId,
        String title,
        DateTime startDate,
        DateTime endDate,
        String location
    )
    {
        this.id = id;
        this.speakers = speakers;
        this.conferenceRoomId = conferenceRoomId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;

    }

    public Guid id { get; set; }
    public List<string> speakers { get; set; }
    public Guid conferenceRoomId { get; set; }
    public String title { get; set;}
    public DateTime startDate { get; set;}
    public DateTime endDate { get; set;}
    public String location { get; set;}
}