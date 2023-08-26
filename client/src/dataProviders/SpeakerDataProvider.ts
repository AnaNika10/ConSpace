import config from '../config/local.json'

export class SpeakerDataProvider {

    private static readonly gateway = config.API_GATEWAY;

    public static async fetchSeminarSchedule() {
        return await fetch(`${this.gateway}/Speaker`);    
    }

}