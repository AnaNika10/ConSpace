using Common.Security.Extensions;
using Ocelot.Middleware;
using SPAGateway.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices();
builder.Services.ConfigureJWT(builder.Configuration);
var corsPolicy = "corsPolicy"; 
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy,
        policy  =>
        {
            policy.AllowAnyOrigin()
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

await app.UseOcelot();

app.UseCors(corsPolicy);
app.UseAuthentication();
app.UseAuthorization();
    
app.Run();