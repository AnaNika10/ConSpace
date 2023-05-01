using Conference.Api.DTOs.Speakers;

namespace Conference.Api.Repositories
{
    public interface ISpeakersRepository
    {
        Task<IEnumerable<SpeakerDTO>> GetAllSpeakers();
        Task<SpeakerDTO> GetSpeaker(int id);

        Task<int> CreateSpeaker(CreateSpeakerDTO request);

        Task<bool> UpdateSpeaker(UpdateSpeakerDTO request);

        Task<bool> DeleteSpeaker(int id);
    }
}
