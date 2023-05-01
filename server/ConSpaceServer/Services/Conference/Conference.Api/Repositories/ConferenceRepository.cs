using AutoMapper;
using Conference.Api;
using Conference.Api.DTOs.Conference;
using Dapper;
using DapperQueryBuilder;
using System.Reflection;
using System.Text;

namespace Conference.Api.Repositories
{
    public class ConferenceRepository : IConferenceRepository
    {
        private readonly IConferenceContext _context;
        private readonly IMapper _mapper;

        public ConferenceRepository(IConferenceContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<int> CreateConference(CreateConferenceDTO conference)
        {
            using var connection = _context.GetConnection();
            
            int id = await connection.QueryFirstAsync<int>(
                  "insert into \"Conference\" (\"Name\",\"Floor\",\"DateTime\",\"Exhibitors\",\"Description\", \"FilesUrls\")" +
                  " values (@Name, @Floor, @DateTime,@Exhibitors, @Description, @FilesUrls) RETURNING \"ConferenceId\"",
                  new { 
                      Name = conference.Name,
                      Floor = conference.Floor,
                      DateTime = conference.DateTime,
                      Exhibitors = conference.Exhibitors,
                      Description = conference.Description,
                      FilesUrls = conference.FilesUrls
                  });

            return id;
        }
        public async Task<ConferenceDTO> GetConference(int id)
        {
            using var connection = _context.GetConnection();

            var post = await connection.QueryFirstOrDefaultAsync<Entities.Conference>(
                "SELECT * FROM \"Conference\" WHERE \"ConferenceId\" = @Id", new { Id = id });

            return _mapper.Map<ConferenceDTO>(post);
        }

        public async Task<bool> DeleteConference(int conferenceId)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "DELETE FROM \"Conference\" WHERE \"ConferenceId\" = @conferenceId",
                new { conferenceId });

            if (affected == 0)
                return false;

            return true;
        }

        public async Task<IEnumerable<ConferenceDTO>> GetAllConferences()
        {
            using var connection = _context.GetConnection();

            var conferences = await connection.QueryAsync<Entities.Conference>(
              "SELECT * FROM \"Conference\""

              );
            return _mapper.Map<IEnumerable<ConferenceDTO>>(conferences);
        }

        public async Task<IEnumerable<ConferenceDTO>> GetConferencesWithFilter(FilterConferenceDTO filter)
        {
            using var connection = _context.GetConnection();

            var query = new StringBuilder($"SELECT * FROM \"Conference\" WHERE 1=1");
            foreach (PropertyInfo prop in filter.GetType().GetProperties())
            {
                var value = prop.GetValue(filter);
                if (value is not null)
                {
                    query.Append($" AND \"{prop.Name}\" = {value}");
                }
            }
            var conferences = await connection.QueryAsync<Entities.Conference>(query.ToString());

            return _mapper.Map<IEnumerable<ConferenceDTO>>(conferences);
        }

        public async Task<bool> UpdateConference(UpdateConferenceDTO conference)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "UPDATE \"Conference\" SET \"Name\"=@Name, \"Floor\" = @Floor, \"DateTime\" = @DateTime " +
                ",\"Exhibitors\"=@Exhibitors, \"Description\" = @Description, \"FilesUrls\" = @FilesUrls" +
                " WHERE \"ConferenceId\" = @ConferenceId",
               new
                 {
                   ConferenceId = conference.ConferenceId,
                   Name = conference.Name,
                   Floor = conference.Floor,
                   DateTime = conference.DateTime,
                   Exhibitors = conference.Exhibitors,
                   Description = conference.Description,
                   FilesUrls = conference.FilesUrls
                 });

            if (affected == 0)
                return false;

            return true;
        }
    }
}
