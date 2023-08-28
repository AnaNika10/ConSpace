#region

using User.Common.DTOs;
using User.Common.Entities;
using User.Common.Models;
using AttendeeType = User.Common.Entities.AttendeeType;
using ReminderType = User.Common.Entities.ReminderType;

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
    
    public static InviteStatus mapToEntity(DTOs.InviteStatusDto type)
    {
        switch (type)
        {
            case InviteStatusDto.PENDING_ANSWER:
                return InviteStatus.PENDING_ANSWER;
            case InviteStatusDto.MEET_SCHEDULED:
                return InviteStatus.MEET_SCHEDULED;
            case InviteStatusDto.PLACE_AND_TIME_NEGOTIATION:
                return InviteStatus.PLACE_AND_TIME_NEGOTIATION;
            case InviteStatusDto.DECLINED:
                return InviteStatus.DECLINED;
            default:
                throw new ArgumentException("Illegal argument when mapping InviteStatus");
        }
    }

    public static DTOs.InviteStatusDto mapToDto(InviteNotificationStatus type)
    {
        switch (type)
        {
            case InviteNotificationStatus.PENDING_ANSWER:
            return InviteStatusDto.PENDING_ANSWER;
            case InviteNotificationStatus.MEET_SCHEDULED:
                return InviteStatusDto.MEET_SCHEDULED;
            case InviteNotificationStatus.PLACE_AND_TIME_NEGOTIATION:
                return InviteStatusDto.PLACE_AND_TIME_NEGOTIATION;
            case InviteNotificationStatus.DECLINED:
                return InviteStatusDto.DECLINED;
            default:
                throw new ArgumentException("Illegal argument when mapping InviteStatus");
        }
    }
    
    public static InviteNotificationStatus mapToModel(InviteStatus type)
    {
        switch (type)
        {
            case InviteStatus.PENDING_ANSWER:
                return InviteNotificationStatus.PENDING_ANSWER;
            case InviteStatus.MEET_SCHEDULED:
                return InviteNotificationStatus.MEET_SCHEDULED;
            case InviteStatus.PLACE_AND_TIME_NEGOTIATION:
                return InviteNotificationStatus.PLACE_AND_TIME_NEGOTIATION;
            case InviteStatus.DECLINED:
                return InviteNotificationStatus.DECLINED;
            default:
                throw new ArgumentException("Illegal argument when mapping InviteStatus");
        }
    }
}