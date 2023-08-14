using AutoMapper;
using EventBus.Messages.Events;
using User.DTO;

namespace User.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile() 
        {
            CreateMap<SeminarDto, SeminarChangeEvent>().ReverseMap();
        }
    }
}
