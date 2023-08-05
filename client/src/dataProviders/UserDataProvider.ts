import { AuthenticationWrapper } from './AuthenticationWrapper';
import config from '../config/local.json'

export class UserDataProvider {

    public static gateway = config.API_GATEWAY;

    public static async fetchUserSchedule(token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/GetSchedule`, "GET", token);
    }

    public static async deleteSeminarFromSchedule(seminarId : string, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/DeleteSeminarFromSchedule/${seminarId}`, "DELETE", token);
    }
}