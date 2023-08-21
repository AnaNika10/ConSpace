#region

using System.Text;
using EventBus.Messages.Events;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Polly;
using User.Common.Data;
using User.Common.DTOs;
using User.Common.Entities;
using User.Common.Repositories;

#endregion

namespace User.Common.Extensions;

public static class UserExtensions
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<INoteRepository, NoteRepository>();
        services.AddScoped<IRemindersRepository, ReminderRepository>();
        services.AddScoped<IAttendeeRepository, AttendeeRepository>();
        services.AddScoped<IScheduleRepository, ScheduleRepository>();
        services.AddScoped<IInvitesRepository, InvitesRepository>();

        services.AddAutoMapper(configuration => { 
            configuration.CreateMap<NoteDto, Note>().ReverseMap();
        }
        );
        services.AddEntityFrameworkNpgsql().AddDbContext<UserContext>();
    }

    public static void MigrateDatabase(this IApplicationBuilder app)
    {
        var logger = app.ApplicationServices.GetRequiredService<ILogger<UserContext>>();
        try
        {
            logger.LogInformation("Migrating database associated with UserContext");

            var retry = Policy.Handle<SqlException>()
                .WaitAndRetry(
                    retryCount: 5,
                    sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                    onRetry: (exception, retryCount, ctx) =>
                    {
                        logger.LogError("Retry {RetryCount} if {PolicyKey} at {OperationKey}, due to {Exception}.", retryCount, ctx.PolicyKey, ctx.OperationKey, exception);
                    });
            retry.Execute(() =>
            {
                using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
                scope.ServiceProvider.GetService<UserContext>().Database.Migrate();
            });

            logger.LogInformation("Migrating database associated with context UserContext was successful");
        } 
        catch (SqlException e)
        {
            logger.LogError(e, "An error occured while migrating the database used on context UserContext");
        }
    }
}