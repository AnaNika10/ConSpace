using Ocelot.DependencyInjection;

namespace SPAGateway.Extensions;

public static class OcelotExtension
{
    public static void ConfigureServices(this IServiceCollection services)
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile($"ocelot.json", true, true)
            .Build();
        services.AddOcelot(configuration);
    }
}