using Ocelot.DependencyInjection;

namespace SPAGateway.Extensions;

public static class OcelotExtension
{
    public static void ConfigureServices(this IServiceCollection services)
    {
        services.AddOcelot();
    }
}