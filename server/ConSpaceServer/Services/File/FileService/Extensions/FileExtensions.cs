using File.Data;
using File.Repositories;
using File.Repositories.Interfaces;
using File.Utilities.Antivirus;

namespace File.Extensions;

public static class FileExtensions
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<IFileContext, FileContext>();
        services.AddScoped<IFileRepository, FileRepository>();
        services.AddScoped<IAntiVirusContext, AntiVirusContext>();
    }
}