export interface Seminar {
    seminarId: string,
    name : string,
    hall: number,
    speakers: [number],
    exhibitors: number,
    description: string,
    filesUrls: [string],
    startDateTime: string,
    endDateTime: string
}
