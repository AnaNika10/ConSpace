namespace User.Common.DTOs;

public class InviteDto
{
    public InviteDto(
        Guid id,
        Guid userId,
        Guid inviteeId,
        InviteStatusDto status
    )
    {
        this.id = id;
        this.userId = userId;
        this.inviteeId = inviteeId;
        this.status = status;
    }
    
    public Guid id {get;set;}
    public Guid userId {get;set;}
    public Guid inviteeId {get;set;}
    public InviteStatusDto status {get;set;}
    public DateTimeOffset timestamp {get;set;}
    
}

public enum InviteStatusDto
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}