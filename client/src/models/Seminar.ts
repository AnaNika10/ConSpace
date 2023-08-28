export interface Seminar {
    seminarId? : string | null | undefined,
    name : string,
    hall: number,
    speakers: [number],
    speakerNames: [string],
    exhibitors: number,
    description: string,
    filesUrls: [string],
    startDateTime: string,
    endDateTime: string
}
