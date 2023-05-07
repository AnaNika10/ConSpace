using Ocelot.Middleware;
using SPAGateway.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices();

var app = builder.Build();

app.UseOcelot().Wait();

app.Run();