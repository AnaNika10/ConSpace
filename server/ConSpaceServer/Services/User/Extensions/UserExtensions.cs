using User.Data;
using User.DTO;
using User.Entities;
using User.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace User.Extensions;

public static class UserExtensions
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<IUserContext, UserContext>();
        services.AddScoped<INoteRepository, NoteRepository>();
        services.AddAutoMapper(configuration =>
            {
                configuration.CreateMap<NoteDto, Note>().ReverseMap();
            }
        );
        services.AddEntityFrameworkNpgsql().AddDbContext<UserContext>();

    }
}