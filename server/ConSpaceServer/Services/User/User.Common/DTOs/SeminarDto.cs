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
        string hall,
        DateTime dateTime
    )
    {
        this.id = id;
        this.speakers = speakers;
        this.hall = hall;
        this.dateTime = dateTime;
    }

    public Guid id { get; set; }
    public List<string> speakers { get; set; }
    public string hall { get; set; }
    public DateTime dateTime { get; set; }
}