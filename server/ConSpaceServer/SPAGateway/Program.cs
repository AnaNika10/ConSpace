using Ocelot.Middleware;
using SPAGateway.Extensions;

var builder = WebApplication.CreateBuilder(args);
Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((hostingContext, config) =>
    {
        config.AddJsonFile($"ocelot.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true);
    });

builder.Services.ConfigureServices();

var app = builder.Build();

await app.UseOcelot();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();