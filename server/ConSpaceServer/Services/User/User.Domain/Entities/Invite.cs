#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Domain.Entities;

[Table("invites")]
public class Invite
{
    public Invite(string userEmail, string inviteeEmail, InviteStatus status, DateTimeOffset? time, string? place)
    {
        UserEmail = userEmail;
        InviteeEmail = inviteeEmail;
        Status = status;
        Place = place;
        Time = time;
    }

    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Column("user_email")] public string UserEmail { get; set; }

    [Column("invitee_email")] public string InviteeEmail { get; set; }

    [Column("status")] public InviteStatus Status { get; set; }

    [Column("timestamp")] public DateTimeOffset Timestamp { get; set; }
    [Column("time")] public DateTimeOffset? Time { get; set; }
    [Column("place")] public string? Place { get; set; }
}

public enum InviteStatus
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}