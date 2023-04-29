using User.Entities;

namespace User.Extensions;

public static class ReminderTypeExtension
{
    public static ReminderType mapToEntity(DTO.ReminderType type)
    {
        switch (type)
        {
            case DTO.ReminderType.MEET_UP:
                return ReminderType.MEET_UP;
            case DTO.ReminderType.SEMINAR:
                return ReminderType.SEMINAR;
            default:
                throw new ArgumentException("Illegal argument when mapping ReminderType");
        }
    }
    
    public static DTO.ReminderType mapToDto(ReminderType type)
    {
        switch (type)
        {
            case ReminderType.SEMINAR:
                return DTO.ReminderType.SEMINAR;
            case ReminderType.MEET_UP:
                return DTO.ReminderType.MEET_UP;
            default:
                throw new ArgumentException("Illegal argument when mapping ReminderType");
        }
    }
}