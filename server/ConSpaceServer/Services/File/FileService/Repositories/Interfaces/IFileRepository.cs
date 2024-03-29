using File.DTO;

namespace File.Repositories.Interfaces
{
    public interface IFileRepository
    {
        Task<FileDTO> GetFile(string id);
        void UploadFile(FileDTO file);
        public Task<FileDTO> GetAvatar(string userId);
        public Task<bool> DeleteAvatar(string fileId);
    }
}