using File.DTO;
using MongoDB.Driver;

namespace File.Data
{
    public interface IFileContext
    {
        public IMongoCollection<FileDTO> Files { get; }
    }
}