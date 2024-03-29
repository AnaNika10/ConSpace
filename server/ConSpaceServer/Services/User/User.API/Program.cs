#region

using System.Text.Json.Serialization;
using Common.Security.Extensions;
using EventBus.Messages.Contsants;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Microsoft.OpenApi.Models;
using User.API.Controllers.Authorization;
using User.API.Controllers.Exceptions;
using User.API.Controllers.Hubs;
using User.API.EventBusConsumers;
using User.API.Mappers;
using User.Infrastructure.Extensions;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.RegisterMappings();
builder.Services.AddControllers()
    .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
    {
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter a valid token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });

        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] { }
            }
        });
    }
);
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<SeminarChangeConsumer>();
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["EventBusSettings:HostAddress"]);
        cfg.ReceiveEndpoint(EventBusConstants.ConferenceUpdateQueue,
            c => { c.ConfigureConsumer<SeminarChangeConsumer>(context); });
    });
});

builder.Services.RegisterServices();
builder.Services.AddSignalR();
builder.Services.AddSingleton<IUserIdProvider, EmailBasedUserIdProvider>();
builder.Services.ConfigureJWT(builder.Configuration);
var cors = builder.Services.ConfigureCors();
var app = builder.Build();

app.MigrateDatabase();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(cors);
app.UseMiddleware<GlobalExceptionHandler>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseEndpoints(endpoints =>
    endpoints.MapHub<InvitationHub>("/notifications", options => options.CloseOnAuthenticationExpiration = true));

app.Run();