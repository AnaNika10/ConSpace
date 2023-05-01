using Npgsql;

namespace Conference.Api
{
    public interface IConferenceContext
    {

        NpgsqlConnection GetConnection();
    }
}
