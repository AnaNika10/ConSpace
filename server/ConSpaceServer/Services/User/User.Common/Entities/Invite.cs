#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Common.Entities;

[Table("invites")]
public class Invite
{
    
    public Invite(Guid userId, Guid inviteeId, InviteStatus status)
    {
        UserId = userId;
        InviteeId = inviteeId;
        this.status = status;
    }
    
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Column("user_id")] public Guid UserId { get; set; }

    [Column("invitee_id")] public Guid InviteeId { get; set; }

    [Column("status")] public InviteStatus status { get; set; }

    [Column("timestamp")] public DateTimeOffset timestamp { get; set; }
    [Column("time")] public DateTimeOffset?  time{ get; set; }
    [Column("place")] public string?  place{ get; set; }
}

public enum InviteStatus
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}