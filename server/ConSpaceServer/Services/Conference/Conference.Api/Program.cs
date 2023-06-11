using Conference.Api;
using Conference.Api.Repositories;
using MassTransit;
using Conference.Api.Data;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IConferenceRepository, ConferenceRepository>()
                .AddScoped<IConferenceContext, ConferanceContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMassTransit(x => 
  x.UsingRabbitMq((context, cfg) =>
{
    cfg.Host(builder.Configuration["EventBusSettings:HostAdress"]);
    }));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
