using AutoMapper.Extensions.EnumMapping;
using EventBus.Messages.Events;
using User.API.DTOs;
using User.Application.Models;
using User.Domain.Entities;
using AttendeeType = User.Domain.Entities.AttendeeType;
using AttendeeTypeDTO = User.API.DTOs.AttendeeType;
using ReminderType = User.Domain.Entities.ReminderType;
using ReminderTypeDTO = User.API.DTOs.ReminderType;

namespace User.API.Mappers;

public static class RegisterMappers
{
    public static void RegisterMappings(this IServiceCollection services)
    {
        services.AddAutoMapper(configuration => { configuration.CreateMap<NoteDto, Note>().ReverseMap(); });
        services.AddAutoMapper(configuration =>
        {
            configuration.CreateMap<SeminarDto, SeminarChangeEvent>()
                .ForMember(dest => dest.StartDateTime, act => act.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDateTime, act => act.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.Name, act => act.MapFrom(src => src.Title))
                .ForMember(dest => dest.SpeakerNames, act => act.MapFrom(src => src.Speakers))
                .ForMember(dest => dest.Hall, act => act.MapFrom(src => src.Location))
                .ForMember(dest => dest.Speakers, act => act.MapFrom(src => src.SpeakerIds))
                .ForMember(dest => dest.SeminarId, act => act.MapFrom(src => src.Id))
                .ReverseMap();
        });
        services.AddAutoMapper(configuration => { configuration.CreateMap<AttendeeDto, Attendee>().ReverseMap(); });
        services.AddAutoMapper(configuration => { configuration.CreateMap<InviteDto, Invite>().ReverseMap(); });
        services.AddAutoMapper(configuration => { configuration.CreateMap<ReminderDto, Reminder>().ReverseMap(); });
        services.AddAutoMapper(configuration => { configuration.CreateMap<SeminarDto, Seminar>().ReverseMap(); });
        services.AddAutoMapper(configuration =>
        {
            configuration.CreateMap<AttendeeTypeDTO, AttendeeType>().ConvertUsingEnumMapping(opt => opt.MapByName())
                .ReverseMap();
        });
        services.AddAutoMapper(configuration =>
        {
            configuration.CreateMap<InviteStatusDto, InviteStatus>().ConvertUsingEnumMapping(opt => opt.MapByName())
                .ReverseMap();
        });
        services.AddAutoMapper(configuration =>
        {
            configuration.CreateMap<InviteStatusDto, InviteNotificationStatus>().ConvertUsingEnumMapping(opt => opt.MapByName())
                .ReverseMap();
        });
        services.AddAutoMapper(configuration =>
        {
            configuration.CreateMap<ReminderTypeDTO, ReminderType>().ConvertUsingEnumMapping(opt => opt.MapByName())
                .ReverseMap();
        });
    }
}