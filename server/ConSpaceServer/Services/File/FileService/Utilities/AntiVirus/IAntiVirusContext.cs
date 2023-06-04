using ClamAV.Net.Client;
using File.Controllers;

namespace File.Utilities.Antivirus
{
    public interface IAntiVirusContext
    {
        public IClamAvClient _client { get; }

        public Task<bool> ScanFileForViruses(IFormFile file, ILogger<FileUploadController> logger);
        public Task<bool> ScanFileForViruses(byte[] content, ILogger<FileUploadController> logger);
    }
}