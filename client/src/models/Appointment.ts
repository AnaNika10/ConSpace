
export interface Appointment {
    id : string,
    conferenceRoomId : string, 
    location : string,
    title : string
    speakers : [string]
    startDate : string
    endDate : string,
}