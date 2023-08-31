export interface Seminar {
    seminarId? : string | null | undefined,
    name : string,
    hall: string,
    speakers: number[],
    speakerNames: string[],
    exhibitors: number | null,
    description: string,
    startDateTime: string,
    endDateTime: string
}
