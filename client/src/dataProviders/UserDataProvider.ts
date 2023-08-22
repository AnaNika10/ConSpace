import { AuthenticationWrapper } from './AuthenticationWrapper';
import config from '../config/local.json'
import { Note } from '../models/Note';

export class UserDataProvider {

    public static gateway = config.API_GATEWAY;

    public static async fetchUserSchedule(token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/GetSchedule`, "GET", token);
    }

    public static async deleteSeminarFromSchedule(seminarId : string, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/DeleteSeminarFromSchedule/${seminarId}`, "DELETE", token);
    }

    public static async getAllNotes(token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/GetAllNotes`, "GET", token);
    }

    public static async addNote(note:Note, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/createNote`, "POST", token, note);
    }

    public static async deleteNote(id:string, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/DeleteNote/${id}`, "DELETE", token);
    }

    public static async editNote(note: Note, token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/EditNote`, "PATCH", token, note);
    }

    public static async getAllInvites(token : string) {
        return await AuthenticationWrapper.fetchWithAuth(`${this.gateway}/GetAllInvites`, "GET", token);
    }
}