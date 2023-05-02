using Conference.Api.DTOs.Exhibitors;

namespace Conference.Api.Repositories
{
    public interface IExhibitorsRepository
    {
        Task<IEnumerable<ExhibitorDTO>> GetAllExhibitors();
        Task<ExhibitorDTO> GetExhibitor(int id);

        Task<int> CreateExhibitor(CreateExhibitorDTO request);

        Task<bool> UpdateExhibitor(UpdateExhibitorDTO request);

        Task<bool> DeleteExhibitor(int id);
    }
}
