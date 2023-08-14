using Common.Security.Extensions;
using Ocelot.Middleware;
using SPAGateway.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices();
var corsPolicy = builder.Services.ConfigureCors();
builder.Services.ConfigureJWT(builder.Configuration);

var app = builder.Build();

app.UseCors(corsPolicy);
await app.UseOcelot();

app.UseAuthentication();
app.UseAuthorization();
app.Run();