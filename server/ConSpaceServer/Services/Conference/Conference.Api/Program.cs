using Common.Security.Extensions;
using Conference.Api;
using Conference.Api.Repositories;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Conference.Api.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddMassTransit(x => 
  x.UsingRabbitMq((context, cfg) =>
{
    cfg.Host(builder.Configuration["EventBusSettings:HostAddress"]);
    }));

builder.Services.AddControllers();
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
builder.Services.ConfigureJWT(builder.Configuration);
var cors = builder.Services.ConfigureCors();
builder.Services.AddScoped<ISeminarRepository, SeminarRepository>()
                .AddScoped<IConferenceContext, ConferanceContext>()
                .AddScoped<IFAQRepository, FAQRepository>()
                .AddScoped<ISpeakersRepository, SpeakersRepository>()
                .AddScoped<IExhibitorsRepository, ExhibitorsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(cors);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
