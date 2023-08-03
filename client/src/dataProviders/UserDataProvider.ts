import config from '../config/local.json'

export class UserDataProvider {

    private static readonly gateway = config.API_GATEWAY;

    public static async fetchUserSchedule() {
        return await fetch(`${this.gateway}`);    
    }

}