using Common.Security.Extensions;
using Ocelot.Middleware;
using SPAGateway.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices();
builder.Services.ConfigureJWT(builder.Configuration);

var app = builder.Build();

await app.UseOcelot();

app.UseAuthentication();
app.UseAuthorization();
    
app.Run();