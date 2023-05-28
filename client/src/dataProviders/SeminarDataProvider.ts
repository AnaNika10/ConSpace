import config from '../config/local.json'

export class SeminarDataProvider {

    private static readonly gateway = config.API_GATEWAY;
    private static readonly path = 'http://localhost:8002/api/v1/Conference'

    public static async fetchSeminarSchedule() {
        return await fetch(`${this.path}`);    
    }

}