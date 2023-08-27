import config from '../config/local.json'
import { Speaker } from '../models/Speaker';
import { AuthenticationWrapper } from './AuthenticationWrapper';

export class SpeakerDataProvider {

    private static readonly gateway = config.API_GATEWAY;

    public static async fetchSpeakers(token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/Speaker`,"GET",token);    
    }
    public static async DeleteSpeaker(id:number, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/Speaker/${id}`, "DELETE", token);

        
    }

    public static async UpdateSpeaker(s: Speaker, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/Speaker`, "PUT", token, s);
    }
    public static async InsertSpeaker(s: Speaker, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/Speaker`, "POST", token, s);
    }

}