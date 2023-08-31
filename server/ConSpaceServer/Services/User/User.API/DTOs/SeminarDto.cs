namespace User.API.DTOs;

public class SeminarDto
{
    public SeminarDto()
    {
        Speakers = new List<string>();
    }

    public SeminarDto(
        Guid id,
        List<string> speakers,
        List<int> speakerIds,
        string title,
        DateTime startDate,
        DateTime endDate,
        string location
    )
    {
        Id = id;
        Speakers = speakers;
        SpeakerIds = speakerIds;
        Title = title;
        StartDate = startDate;
        EndDate = endDate;
        Location = location;
    }

    public Guid Id { get; set; }
    public List<string> Speakers { get; set; }
    public List<int> SpeakerIds { get; set; }
    public String Title { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public String Location { get; set; }
}