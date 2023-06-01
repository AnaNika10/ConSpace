using AutoMapper;
using IdentityServer.DTOs;
using IdentityServer.Entities;

namespace IdentityServer.Mapper;

public class IdentityProfile : Profile
{
    public IdentityProfile()
    {
        CreateMap<UserEntity, NewUserDto>().ReverseMap();
        CreateMap<UserEntity, UserDetails>().ReverseMap();
    }
}