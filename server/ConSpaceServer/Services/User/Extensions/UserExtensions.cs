using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using User.Data;
using User.DTO;
using User.Entities;
using User.Repositories;
using Microsoft.IdentityModel.Tokens;
using IHostingEnvironment = Microsoft.Extensions.Hosting.IHostingEnvironment;

namespace User.Extensions;

public static class UserExtensions
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<INoteRepository, NoteRepository>();
        services.AddScoped<IRemindersRepository, ReminderRepository>();
        services.AddScoped<IAttendeeRepository, AttendeeRepository>();
        services.AddAutoMapper(configuration =>
            {
                configuration.CreateMap<NoteDto, Note>().ReverseMap();
            }
        );
        services.AddEntityFrameworkNpgsql().AddDbContext<UserContext>();

    }

    public static void MigrateDatabase(this IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            scope.ServiceProvider.GetService<UserContext>().Database.Migrate();
        }
    }

    public static void SetupJwt(this IServiceCollection services, IConfiguration configuration)
    {
        // JWT Security
        var jwtSettings = configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings.GetSection("secretKey").Value;
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                    ValidAudience = jwtSettings.GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });
    }
}