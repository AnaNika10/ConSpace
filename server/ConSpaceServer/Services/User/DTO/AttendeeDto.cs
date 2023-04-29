namespace User.DTO;

public class AttendeeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public AttendeeType Type { get; set; }

    public AttendeeDto(Guid id, string name, AttendeeType type)
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