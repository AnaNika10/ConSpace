#region

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using User.Common.Entities;

#endregion

namespace User.Common.Data;

public class UserContext : DbContext
{
    private readonly IConfiguration _configuration;

    public UserContext(IConfiguration configuration)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public DbSet<Note> Notes { get; set; }
    public DbSet<Reminder> Reminders { get; set; }
    public DbSet<Attendee> Attendees { get; set; }
    public DbSet<Seminar> Seminars { get; set; }
    public DbSet<Invite> Invites { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
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
        modelBuilder.Entity<Reminder>()
            .Property(reminder => reminder.timestamp)
            .HasDefaultValueSql("now()");
        modelBuilder.Entity<Reminder>()
            .Property(reminder => reminder.type)
            .HasConversion<string>();
        modelBuilder.Entity<Attendee>()
            .HasMany(attendee => attendee.Notes)
            .WithOne(note => note.user)
            .HasForeignKey(note => note.UserId)
            .HasPrincipalKey(attendee => attendee.Id);
        modelBuilder.Entity<Attendee>()
            .Property(attendee => attendee.Type)
            .HasConversion<string>();
        modelBuilder.Entity<Attendee>()
            .HasMany(attendee => attendee.Seminars)
            .WithOne(seminar => seminar.User)
            .HasForeignKey(seminar => seminar.UserId)
            .HasPrincipalKey(attendee => attendee.Id);
        modelBuilder.Entity<Invite>()
            .Property(invite => invite.timestamp)
            .HasDefaultValueSql("now()");
        modelBuilder.Entity<Invite>()
            .Property(invite => invite.status)
            .HasConversion<string>();
    }
}