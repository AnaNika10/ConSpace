﻿using AutoMapper;
using Conference.Api;
using Conference.Api.DTOs.Seminar;
using Dapper;
using DapperQueryBuilder;
using Conference.Api.Repositories;
using System.Reflection;
using System.Text;

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
                  "insert into \"Seminar\" (\"Name\",\"Floor\",\"DateTime\",\"Exhibitors\",\"Description\", \"FilesUrls\")" +
                  " values (@Name, @Floor, @DateTime,@Exhibitors, @Description, @FilesUrls) RETURNING \"SeminarId\"",
                  new { 
                      Name = seminar.Name,
                      Floor = seminar.Hall,
                      DateTime = seminar.DateTime,
                      Exhibitors = seminar.Exhibitors,
                      Description = seminar.Description,
                      FilesUrls = seminar.FilesUrls
                  });

            return id;
        }
        public async Task<SeminarDTO> GetSeminar(Guid id)
        {
            using var connection = _context.GetConnection();

            var post = await connection.QueryFirstOrDefaultAsync<Entities.Seminar>(
                "SELECT * FROM \"Seminar\" WHERE \"SeminarId\" = @Id", new { Id = id });

            return _mapper.Map<SeminarDTO>(post);
        }

        public async Task<bool> DeleteSeminar(int seminarId)
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

            var seminars = await connection.QueryAsync<Entities.Seminar>(
              "SELECT * FROM \"Seminar\""

              );
            return _mapper.Map<IEnumerable<SeminarDTO>>(seminars);
        }

        public async Task<IEnumerable<SeminarDTO>> GetSeminarsWithFilter(FilterSeminarDTO filter)
        {
            using var connection = _context.GetConnection();

            var query = new StringBuilder($"SELECT * FROM \"Seminar\" WHERE 1=1");
            foreach (PropertyInfo prop in filter.GetType().GetProperties())
            {
                var value = prop.GetValue(filter);
                if (value is not null)
                {
                    query.Append($" AND \"{prop.Name}\" = {value}");
                }
            }
            var seminars = await connection.QueryAsync<Entities.Seminar>(query.ToString());

            return _mapper.Map<IEnumerable<SeminarDTO>>(seminars);
        }

        public async Task<bool> UpdateSeminar(UpdateSeminarDTO seminar)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "UPDATE \"Seminar\" SET \"Name\"=@Name, \"Hall\" = @Hall, \"DateTime\" = @DateTime " +
                ",\"Exhibitors\"=@Exhibitors, \"Description\" = @Description, \"FilesUrls\" = @FilesUrls" +
                " WHERE \"SeminarId\" = @SeminarId",
               new
                 {
                   SeminarId = seminar.SeminarId,
                   Name = seminar.Name,
                   Hall = seminar.Hall,
                   DateTime = seminar.DateTime,
                   Exhibitors = seminar.Exhibitors,
                   Description = seminar.Description,
                   FilesUrls = seminar.FilesUrls
                 });

            if (affected == 0)
                return false;

            return true;
        }
    }
}
