using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Security.Extensions;

namespace Common.Security.Extensions;

public static class SecurityExtensions
{
    public static IServiceCollection ConfigureJWT(this IServiceCollection services, IConfiguration configuration)
    {
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
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.StartsWithSegments("/notifications")))
                        {
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            });

        services.TryAddEnumerable(
            ServiceDescriptor.Singleton<IPostConfigureOptions<JwtBearerOptions>, ConfigureJwtBearerOptions>());

        services.AddAuthorization(options =>
        {
            options.AddPolicy(RolePolicy.ADMINISTRATOR,
                policy => { policy.RequireClaim(CustomClaimTypes.Role, Roles.ADMINISTRATOR); });

            options.AddPolicy(RolePolicy.USER, policy => { policy.RequireClaim(CustomClaimTypes.Role, Roles.USER); });

            options.AddPolicy(RolePolicy.SPEAKER,
                policy => { policy.RequireClaim(CustomClaimTypes.Role, Roles.SPEAKER); });

            options.AddPolicy(RolePolicy.SpeakerOrUser, policy =>
            {
                policy.RequireAssertion(context => context.User.HasClaim(c =>
                        c.Type == CustomClaimTypes.Role && (c.Value == Roles.USER || c.Value == Roles.SPEAKER)
                    )
                );
            });
        });

        return services;
    }
}