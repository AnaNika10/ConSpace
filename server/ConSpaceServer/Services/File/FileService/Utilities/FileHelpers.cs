using File.Controllers;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;

namespace File.Utilities
{
    public static class FileHelpers
    {
        public static async Task<byte[]> ProcessStreamedFile(
            MultipartSection section, ContentDispositionHeaderValue contentDisposition,
            ModelStateDictionary modelState, long sizeLimit)
        {
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await section.Body.CopyToAsync(memoryStream);
                    var ext = Path.GetExtension(contentDisposition.FileName.Value).ToLowerInvariant();

                    if (memoryStream.Length == 0)
                    {
                        modelState.AddModelError("FileService", "The file is empty.");
                    }
                    else if (memoryStream.Length > sizeLimit)
                    {
                        var megabyteSizeLimit = sizeLimit / 1048576;
                        modelState.AddModelError("FileService",
                            $"The file exceeds {megabyteSizeLimit:N1} MB.");
                    }
                    else if (!FileFormatValidator.ValidFileExt(ext, true))
                    {
                        modelState.AddModelError("FileService",
                            "The file type isn't permitted");
                    }
                    else if (!FileFormatValidator.VaildFileSignature(ext, memoryStream, true))
                    {
                        modelState.AddModelError("FileService",
                            "The file's " +
                            "signature doesn't match the file's extension. Ext " + $"{ext}");
                    }
                    else
                    {
                        return memoryStream.ToArray();
                    }
                }
            }
            catch (Exception ex)
            {
                modelState.AddModelError("FileService",
                    "The upload failed. Error:" + $"{ex.Message}");
            }

            return Array.Empty<byte>();
        }

        public static (int, string) ValidateFileProperties(IFormFile file, long sizeLimit,
            ILogger<FileUploadController> logger)
        {
            if (file.Length == 0 || file.Length > sizeLimit)
            {
                return (415, "Invalid file size of: " + file.FileName);
            }

            (string _, string originalFileExt) = FileFormatValidator.GetOriginalFileNameAndExtension(file.FileName);
            if (!FileFormatValidator.ValidFileExt(originalFileExt))
            {
                return (415, "Unsupported file format of: " + file.FileName);
            }

            if (!FileFormatValidator.VaildFileSignature(originalFileExt, file.OpenReadStream()))
            {
                logger.LogInformation("FileService ext signature failed");
                return (415, "FileService extension signature check failed: " + file.FileName);
            }

            return (200, "Ok.");
        }
    }
}