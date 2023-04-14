using Npgsql;

namespace User.Data;

public interface IUserContext
{
    NpgsqlDataSource GetDataSource();
}