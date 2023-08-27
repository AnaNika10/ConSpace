using AutoMapper;
using Conference.Api.DTOs.Speakers;
using Dapper;

namespace Conference.Api.Repositories
{
    public class SpeakersRepository : ISpeakersRepository
    {
        private readonly IConferenceContext _context;
        private readonly IMapper _mapper;

        public SpeakersRepository(IConferenceContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<SpeakerDTO>> GetAllSpeakers()
        {
            using var connection = _context.GetConnection();

            var speakers = await connection.QueryAsync<Entities.Speaker>(
              "SELECT * FROM \"Speakers\""

              );
            var speakersSorted = speakers.OrderBy(x=> x.SpeakerId);
            return _mapper.Map<IEnumerable<SpeakerDTO>>(speakersSorted);
        }
        public async Task<SpeakerDTO> GetSpeaker(int id)
        {
            using var connection = _context.GetConnection();

            var speaker = await connection.QueryFirstOrDefaultAsync<Entities.Speaker>(
                "SELECT * FROM \"Speakers\" WHERE \"SpeakerId\" = @Id", new { Id = id });

            return _mapper.Map<SpeakerDTO>(speaker);
        }

        public async Task<int> CreateSpeaker(CreateSpeakerDTO faq)
        {
            using var connection = _context.GetConnection();

            int id = await connection.QueryFirstAsync<int>(
                  "insert into \"Speakers\" (\"Name\",\"Position\",\"Company\",\"BioInfo\")" +
                  " values (@Name, @Position,@Company, @BioInfo) RETURNING \"SpeakerId\"",
                  new
                  {
                      Name = faq.Name,
                      Position = faq.Position,
                      Company = faq.Company,
                      BioInfo = faq.BioInfo

                  });

            return id;
        }

        public async Task<bool> UpdateSpeaker(UpdateSpeakerDTO speaker)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "UPDATE \"Speakers\" SET \"Name\"=@Name, \"Position\" = @Position,\"Company\" = @Company,\"BioInfo\" = @BioInfo" +
                " WHERE \"SpeakerId\" = @SpeakerId",
               new
               {
                   SpeakerId = speaker.SpeakerId,
                   Name = speaker.Name,
                   Position = speaker.Position,
                   Company = speaker.Company,
                   BioInfo = speaker.BioInfo,
               });

            if (affected == 0)
                return false;

            return true;
        }
        public async Task<bool> DeleteSpeaker(int speakerId)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "DELETE FROM \"Speakers\" WHERE \"SpeakerId\" = @speakerId",
                new { speakerId });

            if (affected == 0)
                return false;

            return true;
        }
    }
}
