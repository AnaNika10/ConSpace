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
        Id = id;
        UserEmail = userEmail;
        UserName = userName;
        InviteeEmail = inviteeEmail;
        InviteeName = inviteeName;
        Timestamp = timestamp;
        Status = status;
        Time = time;
        Place = place;
    }
    
    [JsonInclude]
    public Guid? Id {get;set;}
    [JsonInclude]
    public string UserEmail {get;set;}
    [JsonInclude]
    public string UserName {get;set;}
    [JsonInclude]
    public string InviteeEmail {get;set;}
    [JsonInclude]
    public string InviteeName {get;set;}
    [JsonInclude]
    public InviteStatusDto Status {get;set;}
    [JsonInclude]
    public DateTimeOffset? Timestamp {get;set;}
    [JsonInclude]
    public DateTimeOffset? Time {get;set;}
    [JsonInclude]
    public String? Place {get;set;}
    
}

public enum InviteStatusDto
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}