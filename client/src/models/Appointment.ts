
export interface Appointment {
    id : string,
    conferenceRoomId : number, 
    location : string,
    title : string
    speakers : [string],
    speakerIds: [string],
    startDate : string
    endDate : string,
}