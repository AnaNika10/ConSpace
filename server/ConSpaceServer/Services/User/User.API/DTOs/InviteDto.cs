using System.Text.Json.Serialization;

namespace User.API.DTOs;

public class InviteDto
{
    [JsonConstructor]
    public InviteDto(
        Guid? id,
        string userEmail,
        string userName,
        string inviteeEmail,
        string inviteeName, 
        DateTimeOffset? timestamp,
        InviteStatusDto status,
        DateTimeOffset? time,
        String? place
    )
    {
        this.id = id;
        this.userEmail = userEmail;
        this.userName = userName;
        this.inviteeEmail = inviteeEmail;
        this.inviteeName = inviteeName;
        this.timestamp = timestamp;
        this.status = status;
        this.time = time;
        this.place = place;
    }
    
    [JsonInclude]
    public Guid? id {get;set;}
    [JsonInclude]
    public string userEmail {get;set;}
    [JsonInclude]
    public string userName {get;set;}
    [JsonInclude]
    public string inviteeEmail {get;set;}
    [JsonInclude]
    public string inviteeName {get;set;}
    [JsonInclude]
    public InviteStatusDto status {get;set;}
    [JsonInclude]
    public DateTimeOffset? timestamp {get;set;}
    [JsonInclude]
    public DateTimeOffset? time {get;set;}
    [JsonInclude]
    public String? place {get;set;}
    
}

public enum InviteStatusDto
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}