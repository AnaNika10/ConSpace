using System.Reflection;
using User.GRPC.Services;
using User.Common.Extensions;
using User.Common.DTOs;
using User.GRPC.Protos;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.RegisterServices();
builder.Services.AddAutoMapper(configuration =>
{
    configuration.CreateMap<UserCreationDto, CreateUserResponse>().ReverseMap();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<UserService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
