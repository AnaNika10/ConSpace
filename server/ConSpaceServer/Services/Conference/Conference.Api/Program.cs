using Conference.Api;
using Conference.Api.Repositories;
using Conference.Api.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//static IHostBuilder CreateHostBuilder(string[] args) =>
//    Host.CreateDefaultBuilder(args)
//        .ConfigureServices((_, services) =>
//             services.AddScoped<IConferenceRepository, ConferenceRepository>()
//                     .AddScoped<IConferenceContext, ConferanceContext>()
                     
//             );
builder.Services.AddScoped<IConferenceRepository, ConferenceRepository>()
                .AddScoped<IConferenceContext, ConferanceContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
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
