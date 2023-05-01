using Conference.Api;
using Npgsql;

namespace Conference.Api.Data
{
    public class ConferanceContext : IConferenceContext
    {
        private readonly IConfiguration _configuration;

        public ConferanceContext(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public NpgsqlConnection GetConnection()
        {
            return new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
        }
    }
}
