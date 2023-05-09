using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy(RolePolicy.ADMINISTRATOR, policy =>
            {
                policy.RequireClaim(CustomClaimTypes.Role, Roles.ADMINISTRATOR);
            });

            options.AddPolicy(RolePolicy.USER, policy =>
            {
                policy.RequireClaim(CustomClaimTypes.Role, Roles.USER);
            });

            options.AddPolicy(RolePolicy.SPEAKER, policy =>
            {
                policy.RequireClaim(CustomClaimTypes.Role, Roles.SPEAKER);
            });
            
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
