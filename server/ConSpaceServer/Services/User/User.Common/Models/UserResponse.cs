namespace User.Common.Models;

public class UserResponse
{
    public UserResponse(
        Guid id,
        Guid userId,
        string userName,
        Guid inviteeId,
        InviteNotificationStatus status,
        DateTimeOffset timestamp,
        DateTimeOffset? time,
        string? place
    )
    {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.inviteeId = inviteeId;
        this.timestamp = timestamp;
        this.status = status;
        this.time = time;
        this.place = place;
    }
    
    public Guid id {get;set;}
    public Guid userId {get;set;}
    public string userName {get;set;}
    public Guid inviteeId {get;set;}
    public InviteNotificationStatus status {get;set;}
    public DateTimeOffset timestamp {get;set;}
    public DateTimeOffset? time {get;set;}
    public string? place {get;set;}
    
}