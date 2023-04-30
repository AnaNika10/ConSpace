using User.Entities;
using AttendeeType = User.Entities.AttendeeType;

namespace User.Extensions;

public static class EnumConversionExtension
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


    public static AttendeeType mapToEntity(DTO.AttendeeType type)
    {
        switch (type)
        {
            case DTO.AttendeeType.SPEAKER:
                return AttendeeType.SPEAKER;
            case DTO.AttendeeType.ATTENDEE:
                return AttendeeType.SPEAKER;
            default:
                throw new ArgumentException("Illegal argument when mapping AttendeeType");
        }
    }

    public static DTO.AttendeeType mapToDto(AttendeeType type)
    {
        switch (type)
        {
            case AttendeeType.SPEAKER:
                return DTO.AttendeeType.SPEAKER;
            case AttendeeType.ATTENDEE:
                return DTO.AttendeeType.ATTENDEE;
            default:
                throw new ArgumentException("Illegal argument when mapping AttendeeType");
        }
    }
}