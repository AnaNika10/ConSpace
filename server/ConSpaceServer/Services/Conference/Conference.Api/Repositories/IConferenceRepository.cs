using Conference.Api.DTOs.Conference;

namespace Conference.Api.Repositories
{
    public interface IConferenceRepository
    {
        Task<IEnumerable<ConferenceDTO>> GetAllConferences();
        Task<ConferenceDTO> GetConference(int id);

        Task<IEnumerable<ConferenceDTO>> GetConferencesWithFilter(FilterConferenceDTO filter);
        Task<int> CreateConference(CreateConferenceDTO id);

        Task<bool> UpdateConference(UpdateConferenceDTO id);

        Task<bool> DeleteConference(int id);
    }
}
