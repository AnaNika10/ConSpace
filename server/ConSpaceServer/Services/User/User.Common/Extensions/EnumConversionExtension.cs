#region

using User.Common.Entities;
#endregion

namespace User.Common.Extensions;

public static class EnumConversionExtension
{
    public static ReminderType mapToEntity(DTOs.ReminderType type)
    {
        switch (type)
        {
            case DTOs.ReminderType.MEET_UP:
                return ReminderType.MEET_UP;
            case DTOs.ReminderType.SEMINAR:
                return ReminderType.SEMINAR;
            default:
                throw new ArgumentException("Illegal argument when mapping ReminderType");
        }
    }

    public static DTOs.ReminderType mapToDto(ReminderType type)
    {
        switch (type)
        {
            case ReminderType.SEMINAR:
                return DTOs.ReminderType.SEMINAR;
            case ReminderType.MEET_UP:
                return DTOs.ReminderType.MEET_UP;
            default:
                throw new ArgumentException("Illegal argument when mapping ReminderType");
        }
    }


    public static AttendeeType mapToEntity(DTOs.AttendeeType type)
    {
        switch (type)
        {
            case DTOs.AttendeeType.SPEAKER:
                return AttendeeType.SPEAKER;
            case DTOs.AttendeeType.ATTENDEE:
                return AttendeeType.ATTENDEE;
            default:
                throw new ArgumentException("Illegal argument when mapping AttendeeType");
        }
    }

    public static DTOs.AttendeeType mapToDto(AttendeeType type)
    {
        switch (type)
        {
            case AttendeeType.SPEAKER:
                return DTOs.AttendeeType.SPEAKER;
            case AttendeeType.ATTENDEE:
                return DTOs.AttendeeType.ATTENDEE;
            default:
                throw new ArgumentException("Illegal argument when mapping AttendeeType");
        }
    }
}