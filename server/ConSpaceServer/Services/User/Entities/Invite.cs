using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace User.Entities;

[Table("invites")]
public class Invite
{
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    
    [Column("user_id")]
    public Guid UserId { get; set; }
    
    [Column("invitee_id")]
    public Guid InviteeId { get; set; }
    
    [Column("status")]
    public InviteStatus status { get; set; }
    
    [Column("timestamp")]
    public DateTimeOffset timestamp { get; set; }
}

public enum InviteStatus
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}