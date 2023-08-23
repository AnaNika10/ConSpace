using System.Text.Json.Serialization;

namespace User.Common.DTOs;

public class InviteDto
{
    public InviteDto(
        Guid id,
        Guid userId,
        string userName,
        Guid inviteeId,
        string inviteeName, 
        DateTimeOffset timestamp,
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
    
    [JsonPropertyName("id")]
    public Guid id {get;set;}
    [JsonPropertyName("userId")]
    public Guid userId {get;set;}
    [JsonPropertyName("userName")]
    public string userName {get;set;}
    [JsonPropertyName("inviteeId")]
    public Guid inviteeId {get;set;}
    [JsonPropertyName("inviteeName")]
    public string inviteeName {get;set;}
    [JsonPropertyName("status")]
    public InviteStatusDto status {get;set;}
    [JsonPropertyName("timestamp")]
    public DateTimeOffset timestamp {get;set;}
    
}

public enum InviteStatusDto
{
    PENDING_ANSWER,
    MEET_SCHEDULED,
    PLACE_AND_TIME_NEGOTIATION,
    DECLINED
}