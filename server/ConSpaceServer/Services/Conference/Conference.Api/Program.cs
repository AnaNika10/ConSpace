using Common.Security.Extensions;
using Conference.Api;
using Conference.Api.Repositories;
using Conference.Api.Data;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<ISeminarRepository, SeminarRepository>()
                .AddScoped<IConferenceContext, ConferanceContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var cors = builder.Services.ConfigureCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(cors);
app.UseAuthorization();

app.MapControllers();

app.Run();
