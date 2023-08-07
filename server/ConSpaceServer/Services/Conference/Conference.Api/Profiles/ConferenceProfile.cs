using AutoMapper;
using Conference.Api.DTOs.Seminar;
using Conference.Api.DTOs.Exhibitors;
using Conference.Api.DTOs.FAQ;
using Conference.Api.DTOs.Speakers;
using EventBus.Messages.Events;
using User.Common.DTOs;

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
            CreateMap<SeminarDTO, SeminarChangeEvent>().ForMember(dest => dest.DateTime, act => act.MapFrom(src => src.DateTime)).ReverseMap();
            CreateMap<SeminarDto, SeminarChangeEvent>().ForMember(dest => dest.DateTime, act => act.MapFrom(src => src.dateTime)).ReverseMap();
        }

        
    }
}
