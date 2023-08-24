using System.Text.Json.Serialization;

namespace User.Common.DTOs;

public class InviteDto
{
    [JsonConstructor]
    public InviteDto(
        Guid? id,
        Guid userId,
        string userName,
        Guid inviteeId,
        string inviteeName, 
        DateTimeOffset? timestamp,
        InviteStatusDto status
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
    
    [JsonInclude]
    public Guid? id {get;set;}
    [JsonInclude]
    public Guid userId {get;set;}
    [JsonInclude]
    public string userName {get;set;}
    [JsonInclude]
    public Guid inviteeId {get;set;}
    [JsonInclude]
    public string inviteeName {get;set;}
    [JsonInclude]
    public InviteStatusDto status {get;set;}
    [JsonInclude]
    public DateTimeOffset? timestamp {get;set;}
    
}

public enum InviteStatusDto
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}