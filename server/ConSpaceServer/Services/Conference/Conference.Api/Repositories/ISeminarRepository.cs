using Conference.Api.DTOs.Seminar;
using Conference.Api.DTOs.Seminars;

namespace Conference.Api.Repositories
{
    public interface ISeminarRepository
    {
        Task<IEnumerable<SeminarDTO>> GetAllSeminars();
        Task<SeminarDTO> GetSeminar(int id);

        Task<IEnumerable<SeminarDTO>> GetSeminarsWithFilter(FilterSeminarDTO filter);
        Task<int> CreateSeminar(CreateSeminarDTO id);

        Task<bool> UpdateSeminar(UpdateSeminarDTO id);

        Task<bool> DeleteSeminar(int id);
        Task<List<int>> GetSeminarSpeakers(int id);
        Task<bool> ChangeSeminarSpeakers(ChangeSeminarSpeakersDTO request);
    }
}
