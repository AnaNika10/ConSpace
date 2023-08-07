
export interface Appointment {
    id : string,
    conferenceRoomId : number, 
    location : string,
    title : string
    speakers : [string]
    startDate : string
    endDate : string,
}