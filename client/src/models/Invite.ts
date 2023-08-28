export enum InviteStatus {
    PENDING_ANSWER = "PENDING_ANSWER",
    MEET_SCHEDULED = "MEET_SCHEDULED",
    PLACE_AND_TIME_NEGOTIATION = "PLACE_AND_TIME_NEGOTIATION",
    DECLINED = "DECLINED"
}

export interface Invite {
    id: string | null,
    userId: string,
    userName: string,
    inviteeId: string,
    inviteeName: string,
    timestamp: string
    status: InviteStatus
    time: string,
    place: string
}
