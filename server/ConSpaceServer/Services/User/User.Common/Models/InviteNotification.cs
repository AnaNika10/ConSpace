namespace User.Common.Models;

public class InviteNotification
{
    public InviteNotification(
        Guid id,
        Guid userId,
        string userName,
        Guid inviteeId,
        string inviteeName, 
        DateTimeOffset timestamp,
        InviteNotificationStatus status
    )
    {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.inviteeId = inviteeId;
        this.inviteeName = inviteeName;
        this.timestamp = timestamp;
        this.status = status;
    }
    
    public Guid id {get;set;}
    public Guid userId {get;set;}
    public string userName {get;set;}
    public Guid inviteeId {get;set;}
    public string inviteeName {get;set;}
    public InviteNotificationStatus status {get;set;}
    public DateTimeOffset timestamp {get;set;}
    
}

public enum InviteNotificationStatus
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}