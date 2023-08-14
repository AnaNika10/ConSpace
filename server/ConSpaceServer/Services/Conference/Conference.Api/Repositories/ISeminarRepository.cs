using Conference.Api.DTOs.Seminar;
using Conference.Api.DTOs.Seminars;

namespace Conference.Api.Repositories
{
    public interface ISeminarRepository
    {
        Task<IEnumerable<SeminarDTO>> GetAllSeminars();
        Task<SeminarDTO> GetSeminar(Guid id);

        Task<IEnumerable<SeminarDTO>> GetSeminarsWithFilter(FilterSeminarDTO filter);
        Task<Guid> CreateSeminar(CreateSeminarDTO id);

        Task<bool> UpdateSeminar(UpdateSeminarDTO id);

        Task<List<int>> GetSeminarSpeakers(Guid id);
        Task<bool> ChangeSeminarSpeakers(ChangeSeminarSpeakersDTO request);
        Task<bool> DeleteSeminar(Guid id);
    }
}
