namespace User.DTO;

public class AttendeeDto
{
    public AttendeeDto(Guid id, string name, AttendeeType type)
    {
        Id = id;
        Name = name;
        Type = type;
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public AttendeeType Type { get; set; }
}

public enum AttendeeType
{
    SPEAKER,
    ATTENDEE
}