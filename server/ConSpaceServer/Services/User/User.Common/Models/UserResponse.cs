namespace User.Common.Models;

public class UserResponse
{
    public UserResponse(
        Guid id,
        string userEmail,
        string userName,
        string inviteeEmail,
        InviteNotificationStatus status,
        DateTimeOffset timestamp,
        DateTimeOffset? time,
        string? place
    )
    {
        this.id = id;
        this.userEmail = userEmail;
        this.userName = userName;
        this.inviteeEmail = inviteeEmail;
        this.timestamp = timestamp;
        this.status = status;
        this.time = time;
        this.place = place;
    }
    
    public Guid id {get;set;}
    public string userEmail {get;set;}
    public string userName {get;set;}
    public string inviteeEmail {get;set;}
    public InviteNotificationStatus status {get;set;}
    public DateTimeOffset timestamp {get;set;}
    public DateTimeOffset? time {get;set;}
    public string? place {get;set;}
    
}