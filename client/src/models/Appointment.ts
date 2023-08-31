
export interface Appointment {
    id : string,
    location : string,
    title : string
    speakers : string[],
    speakerIds: number[],
    startDate : string
    endDate : string,
}