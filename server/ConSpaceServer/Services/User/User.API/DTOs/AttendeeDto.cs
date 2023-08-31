namespace User.API.DTOs;

public class AttendeeDto
{
    public AttendeeDto()
    {
    }

    public AttendeeDto(Guid id, string name, AttendeeType type, string email)
    {
        Id = id;
        Name = name;
        Type = type;
        Email = email;
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public AttendeeType Type { get; set; }
    public string Email { get; set; }
}

public enum AttendeeType
{
    SPEAKER,
    ATTENDEE
}