using AutoMapper;
using Conference.Api.DTOs.Conference;
using Conference.Api.DTOs.Exhibitors;
using Conference.Api.DTOs.FAQ;
using Conference.Api.DTOs.Speakers;

namespace Conference.Api.Profiles
{
    public class ConferenceProfile : Profile
    {
        public ConferenceProfile()
        {
            CreateMap<Entities.Conference, ConferenceDTO>().ReverseMap();
            CreateMap<Entities.Speaker, SpeakerDTO>().ReverseMap();
            CreateMap<Entities.Exhibitor, ExhibitorDTO>().ReverseMap();
            CreateMap<Entities.FAQ, FAQDTO>().ReverseMap();
        }

        
    }
}
