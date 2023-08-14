using AutoMapper;
using Conference.Api.DTOs.Seminar;
using Conference.Api.DTOs.Exhibitors;
using Conference.Api.DTOs.FAQ;
using Conference.Api.DTOs.Speakers;
using EventBus.Messages.Events;

namespace Conference.Api.Profiles
{
    public class ConferenceProfile : Profile
    {
        public ConferenceProfile()
        {
            CreateMap<Entities.Seminar, SeminarDTO>().ReverseMap();
            CreateMap<Entities.Speaker, SpeakerDTO>().ReverseMap();
            CreateMap<Entities.Exhibitor, ExhibitorDTO>().ReverseMap();
            CreateMap<Entities.FAQ, FAQDTO>().ReverseMap();
            CreateMap<SeminarDTO, SeminarChangeEvent>().ForMember(dest => dest.StartDateTime, act => act.MapFrom(src => src.StartDateTime))
                                                       .ForMember(dest => dest.EndDateTime, act => act.MapFrom(src => src.EndDateTime))
                                                       .ForMember(dest => dest.Name, act => act.MapFrom(src => src.Name))
                                                       .ForMember(dest => dest.Hall, act => act.MapFrom(src => src.Hall))
                                                       .ForMember(dest => dest.SpeakerNames, act => act.MapFrom(src => src.SpeakerNames))
                                                       .ForMember(dest => dest.Speakers, act => act.MapFrom(src => src.Speakers))
                                                       .ForMember(dest => dest.SeminarId, act => act.MapFrom(src => src.SeminarId)).ReverseMap();

        }

        
    }
}
