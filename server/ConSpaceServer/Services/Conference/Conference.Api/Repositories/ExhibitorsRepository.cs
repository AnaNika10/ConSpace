using AutoMapper;
using Conference.Api.DTOs.Exhibitors;
using Dapper;

namespace Conference.Api.Repositories
{
    public class ExhibitorsRepository : IExhibitorsRepository
    {

        private readonly IConferenceContext _context;
        private readonly IMapper _mapper;

        public ExhibitorsRepository(IConferenceContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<ExhibitorDTO>> GetAllExhibitors()
        {
            using var connection = _context.GetConnection();

            var exhibitors = await connection.QueryAsync<Entities.Exhibitor>(
              "SELECT * FROM \"Exhibitors\""

              );
            return _mapper.Map<IEnumerable<ExhibitorDTO>>(exhibitors);
        }
        public async Task<ExhibitorDTO> GetExhibitor(int id)
        {
            using var connection = _context.GetConnection();

            var post = await connection.QueryFirstOrDefaultAsync<Entities.Exhibitor>(
                "SELECT * FROM \"Exhibitors\" WHERE \"ExhibitorId\" = @Id", new { Id = id });

            return _mapper.Map<ExhibitorDTO>(post);
        }
        public async Task<int> CreateExhibitor(CreateExhibitorDTO exhibitor)
        {
            using var connection = _context.GetConnection();

            int id = await connection.QueryFirstAsync<int>(
                  "insert into \"Exhibitors\" (\"Name\",\"Stand\",\"Description\")" +
                  " values (@Name, @Stand, @Description) RETURNING \"ExhibitorId\"",
                  new
                  {
                      Name = exhibitor.Name,
                      Stand = exhibitor.Stand,
                      Description = exhibitor.Description,
                     
                  });

            return id;
        }

        public async Task<bool> UpdateExhibitor(UpdateExhibitorDTO exhibitor)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "UPDATE \"Exhibitor\" SET \"Name\"=@Name, \"Stand\" = @Stand,\"Description\" = @Description" +
                " WHERE \"ExhibitorId\" = @ExhibitorId",
               new
               {
                   ExhibitorId = exhibitor.ExhibitorId,
                   Name = exhibitor.Name,
                   Stand = exhibitor.Stand,
                   Description = exhibitor.Description,
               });

            if (affected == 0)
                return false;

            return true;
        }
        public async Task<bool> DeleteExhibitor(int exhibitorId)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "DELETE FROM \"Exhibitor\" WHERE \"ExhibitorId\" = @exhibitorId",
                new { exhibitorId });

            if (affected == 0)
                return false;

            return true;
        }
    }
}
