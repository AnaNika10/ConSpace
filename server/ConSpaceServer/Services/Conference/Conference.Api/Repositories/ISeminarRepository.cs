using Conference.Api.DTOs.Seminar;

namespace Conference.Api.Repositories
{
    public interface ISeminarRepository
    {
        Task<IEnumerable<SeminarDTO>> GetAllSeminars();
        Task<SeminarDTO> GetSeminar(Guid id);

        Task<IEnumerable<SeminarDTO>> GetSeminarsWithFilter(FilterSeminarDTO filter);
        Task<Guid> CreateSeminar(CreateSeminarDTO id);

        Task<bool> UpdateSeminar(UpdateSeminarDTO id);

        Task<bool> DeleteSeminar(int id);
    }
}
