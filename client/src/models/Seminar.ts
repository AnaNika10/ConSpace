export interface Seminar {
    name : string,
    hall: number,
    speakers: [number],
    exhibitors: number,
    description: string,
    filesUrls: [string],
    startDateTime: string,
    endDateTime: string,
    conferenceId: number
}
