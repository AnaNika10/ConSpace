namespace User.Common.Models;

public class UserResponse
{
    public UserResponse(
        Guid id,
        Guid userId,
        string userName,
        Guid inviteeId,
        InviteNotificationStatus status,
        DateTimeOffset timestamp
    )
    {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.inviteeId = inviteeId;
        this.timestamp = timestamp;
        this.status = status;
    }
    
    public Guid id {get;set;}
    public Guid userId {get;set;}
    public string userName {get;set;}
    public Guid inviteeId {get;set;}
    public InviteNotificationStatus status {get;set;}
    public DateTimeOffset timestamp {get;set;}
    
}