export enum InviteStatus {
    PENDING_ANSWER = "PENDING_ANSWER",
    MEET_SCHEDULED = "MEET_SCHEDULED",
    PLACE_AND_TIME_NEGOTIATION = "PLACE_AND_TIME_NEGOTIATION",
    DECLINED = "DECLINED"
}

export interface Invite {
    Id: string | null,
    UserEmail: string,
    UserName: string,
    InviteeEmail: string,
    InviteeName: string,
    Timestamp: string
    Status: InviteStatus
    Time: string,
    Place: string
}
