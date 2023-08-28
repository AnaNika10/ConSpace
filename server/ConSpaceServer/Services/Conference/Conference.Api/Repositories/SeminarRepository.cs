using AutoMapper;
using Conference.Api;
using Conference.Api.DTOs.Seminar;
using Dapper;
using DapperQueryBuilder;
using Conference.Api.Repositories;
using System.Reflection;
using System.Text;
using Conference.Api.DTOs.Seminars;
using Conference.Api.DTOs.Speakers;

namespace Conference.Api.Repositories
{
    public class SeminarRepository : ISeminarRepository
    {
        private readonly IConferenceContext _context;
        private readonly IMapper _mapper;

        public SeminarRepository(IConferenceContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<Guid> CreateSeminar(CreateSeminarDTO seminar)
        {
            using var connection = _context.GetConnection();
            
            var id = await connection.QueryFirstAsync<Guid>(
                  "insert into \"Seminar\" (\"Name\",\"Hall\",\"StartDateTime\",\"EndDateTime\",\"Exhibitors\",\"Description\", \"FilesUrls\")" +
                  " values (@Name, @Floor, @StartDateTime, @EndDateTime, @Exhibitors, @Description, @FilesUrls) RETURNING \"SeminarId\"",
                  new { 
                      Name = seminar.Name,
                      Hall = seminar.Hall,
                      StartDateTime = seminar.StartDateTime,
                      EndDateTime = seminar.EndDateTime,
                      Exhibitors = seminar.Exhibitors,
                      Description = seminar.Description,
                      FilesUrls = seminar.FilesUrls
                  });

            return id;
        }
        public async Task<SeminarDTO> GetSeminar(Guid id)
        {
            using var connection = _context.GetConnection();
            
            var sql = "SELECT * FROM \"Seminar\" WHERE \"SeminarId\" = @Id; " +
                      "SELECT \"Speakers\".\"SpeakerId\", \"Name\" " +
                      "FROM \"Seminar_Speakers\" JOIN \"Speakers\" ON \"Speakers\".\"SpeakerId\" = \"Seminar_Speakers\".\"SpeakerId\" " +
                      "WHERE \"SeminarId\" = @Id;";

            var multi = await connection.QueryMultipleAsync(sql, new { Id = id });
            
            var s = multi.ReadFirst<Entities.Seminar>();
            var sps = multi.Read<Entities.Speaker>().ToList();
            
            var speakars =  _mapper.Map<IEnumerable<SpeakerDTO>>(sps);

    
            var seminar = _mapper.Map<SeminarDTO>(s);
            seminar.Speakers = speakars.Select(x=> x.SpeakerId).ToList();
            seminar.SpeakerNames = speakars.Select(x => x.Name).ToList();

            return seminar;
        }

        public async Task<bool> DeleteSeminar(Guid seminarId)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "DELETE FROM \"Seminar\" WHERE \"SeminarId\" = @seminarId",
                new { seminarId });

            if (affected == 0)
                return false;

            return true;
        }

        public async Task<IEnumerable<SeminarDTO>> GetAllSeminars()
        {
            using var connection = _context.GetConnection();

            var ss = await connection.QueryAsync<Entities.Seminar, Entities.Speaker, Entities.Seminar>(
        "SELECT \"Seminar\".* ,\"Speakers\".\"SpeakerId\", \"Speakers\".\"Name\" " +
        "    FROM \"Seminar\"  " +
       "    LEFT JOIN \"Seminar_Speakers\" on \"Seminar_Speakers\".\"SeminarId\" = \"Seminar\".\"SeminarId\" " +
       "   LEFT  JOIN \"Speakers\"  on  \"Seminar_Speakers\".\"SpeakerId\" = \"Speakers\".\"SpeakerId\" ",
        (seminar, speaker) =>
        {
            seminar.Speakers.Add(speaker);
            return seminar;
        }, splitOn: "SpeakerId");

        var seminars = ss.GroupBy(p => p.SeminarId).Select(g =>
        {
            var seminar = g.First();
            seminar.Speakers = g.Select(p => p.Speakers.Single()).ToList();
            return seminar;
        });

        return _mapper.Map<IEnumerable<SeminarDTO>>(seminars);



        }

        public async Task<IEnumerable<SeminarDTO>> GetSeminarsWithFilter(FilterSeminarDTO filter)
        {
            using var connection = _context.GetConnection();
            var sql = "SELECT \"Seminar\".* ,\"Speakers\".\"SpeakerId\", \"Speakers\".\"Name\" " +
                      "FROM \"Seminar\"  " +
                      "JOIN \"Seminar_Speakers\" on \"Seminar_Speakers\".\"SeminarId\" = \"Seminar\".\"SeminarId\" " +
                      "JOIN \"Speakers\"  on  \"Seminar_Speakers\".\"SpeakerId\" = \"Speakers\".\"SpeakerId\" WHERE 1=1";
            var query = new StringBuilder(sql);
            foreach (PropertyInfo prop in filter.GetType().GetProperties())
            {
                var value = prop.GetValue(filter);
                if (value is not null && !value.GetType().IsArray)
                {
                     query.Append($" AND \"{prop.Name}\" = '{value}'");
                }
            }

            if (filter.Speakers is not null && filter.Speakers.Any())
            {
                var speakers = string.Join(',',filter.Speakers);
                query.Append($" AND \"Seminar_Speakers\".\"SpeakerId\" IN ({speakers})");
            }
            var ss = await connection.QueryAsync<Entities.Seminar, Entities.Speaker, Entities.Seminar>(query.ToString(),
        (seminar, speaker) =>
        {
            seminar.Speakers.Add(speaker);
            return seminar;
        }, splitOn: "SpeakerId");

            var seminars = ss.GroupBy(p => p.SeminarId).Select(g =>
            {
                var seminar = g.First();
                seminar.Speakers = g.Select(p => p.Speakers.Single()).ToList();
                return seminar;
            });

            return _mapper.Map<IEnumerable<SeminarDTO>>(seminars);
        }

        public async Task<bool> UpdateSeminar(UpdateSeminarDTO seminar)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "UPDATE \"Seminar\" SET \"Name\"=@Name, \"Hall\" = @Hall, \"StartDateTime\" = @StartDateTime, \"EndDateTime\" = @EndDateTime " +
                ",\"Exhibitors\"=@Exhibitors, \"Description\" = @Description, \"FilesUrls\" = @FilesUrls" +
                " WHERE \"SeminarId\" = @SeminarId",
               new
                 {
                   SeminarId = seminar.SeminarId,
                   Name = seminar.Name,
                   Hall = seminar.Hall,
                   StartDateTime = seminar.StartDateTime,
                   EndDateTime = seminar.EndDateTime,
                   Exhibitors = seminar.Exhibitors,
                   Description = seminar.Description,
                   FilesUrls = seminar.FilesUrls
                 });
          

            if (affected == 0)
                return false;

            return true;
        }

        public async Task<List<int>> GetSeminarSpeakers(Guid id)
        {
            using var connection = _context.GetConnection();

            var seminars = await connection.QueryAsync<int>(
               "SELECT \"SpeakerId\" FROM \"Seminar_Speakers\" WHERE \"SeminarId\" = @Id", new { Id = id });

            return seminars.ToList();
        }

        public async Task<bool> ChangeSeminarSpeakers(ChangeSeminarSpeakersDTO request)
        {
            string deleteSql = null;
            string insertSql = null;
            var seminar_speaker_delete = new List<object>();
            var seminar_speaker = new List<object>();
            using var connection = _context.GetConnection();
            int affectedInsert = 0;
            int affectedDelete = 0;
            connection.Open();
            if (request.RemovedSpeakers.Any())
            {
                deleteSql = "DELETE FROM \"Seminar_Speakers\" WHERE \"SeminarId\" = @SeminarId AND \"SpeakerId\" = @SpeakerId";
                
                request.RemovedSpeakers.ForEach(speaker =>
                {
                    seminar_speaker_delete.Add(new { SeminarId = request.SeminarId, SpeakerId = speaker });
                });
            }
            if (request.Speakers.Any())
            {
                insertSql = "INSERT INTO \"Seminar_Speakers\" (\"SeminarId\",\"SpeakerId\") VALUES( @SeminarId, @SpeakerId )";
                
                request.Speakers.ForEach(speaker =>
                {
                    seminar_speaker.Add(new { SeminarId = request.SeminarId, SpeakerId = speaker });
                });
            }
            using var trans = connection.BeginTransaction();
            if(!string.IsNullOrEmpty(deleteSql))
            {
                affectedDelete = await connection.ExecuteAsync(deleteSql, seminar_speaker_delete);
            }
            if (!string.IsNullOrEmpty(insertSql))
            {
                 affectedInsert = await connection.ExecuteAsync(insertSql, seminar_speaker);
            }
            trans.Commit();
            if (affectedDelete == 0 && affectedInsert == 0)
                return false;

            return true;
        }
    }
}
