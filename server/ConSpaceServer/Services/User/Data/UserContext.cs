using Microsoft.Extensions.Configuration;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using User.Entities;

namespace User.Data;

public class UserContext : DbContext
{
    private readonly IConfiguration _configuration;
    public DbSet<Note> Notes {get; set;}

    public UserContext(IConfiguration configuration)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options) {
        options.UseNpgsql(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Note>()
            .Property(note => note.deleted)
            .HasDefaultValue(false);
        modelBuilder.Entity<Note>()
            .Property(note => note.created)
            .HasDefaultValueSql("now()");
    }


    public NpgsqlDataSource GetDataSource()
    {
        var connStr = _configuration.GetValue<string>("DatabaseSettings:ConnectionString");
    
        return NpgsqlDataSource.Create(connStr);
    }
}