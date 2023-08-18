import config from '../config/local.json'

export class SeminarDataProvider {

    private static readonly gateway = config.API_GATEWAY;

    public static async fetchSeminarSchedule() {
        return await fetch(`${this.gateway}/Conferences`);    
    }

}