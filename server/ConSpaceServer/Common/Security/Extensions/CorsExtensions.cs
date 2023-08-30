using Microsoft.Extensions.DependencyInjection;

namespace Common.Security.Extensions;

public static class CorsExtensions
{
    public static string ConfigureCors(this IServiceCollection services)
    {
        var corsPolicy = "CorsPolicy";
        services.AddCors(options =>
            {
                options.AddPolicy(name: corsPolicy,
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    }
                );
            }
        );
        return corsPolicy;
    }
}