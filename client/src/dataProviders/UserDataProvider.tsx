import config from "../config/local.json";
import { Appointment } from "../models/Appointment";
import { Note } from "../models/Note";
import { RequestMethod, RequestWrapper } from "./RequestWrapper";

export class UserDataProvider {
  private static readonly gateway = config.API_GATEWAY;
  private static readonly CREATE_NOTE_URL = "/CreateNote";
  private static readonly DELETE_NOTE_URL = "/DeleteNote";
  private static readonly EDIT_NOTE_URL = "/EditNote";
  private static readonly DELETE_SEMINAR_FROM_SCHEDULE_URL =
    "/DeleteSeminarFromSchedule";
  private static readonly GET_INVITES = "/GetAllInvites";
  private static readonly GET_ALL_NOTES = "/GetAllNotes";

  public static async fetchUserSchedule(token: string) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}/GetSchedule`,
      token,
      RequestMethod.GET
    );
  }

  public static async deleteSeminarFromSchedule(
    seminarId: string,
    token: string
  ) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.DELETE_SEMINAR_FROM_SCHEDULE_URL}/${seminarId}`,
      token,
      RequestMethod.DELETE
    );
  }

  public static async insertSeminarToSchedule(a:Appointment, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/AddSeminarToSchedule`,
      token,
      RequestMethod.POST,
      a
    );
  }

  public static async getAllNotes(token: string) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.GET_ALL_NOTES}`,
      token,
      RequestMethod.GET
    );
  }

  public static async addNote(note: Note, token: string) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.CREATE_NOTE_URL}`,
      token,
      RequestMethod.POST,
      note
    );
  }

  public static async deleteNote(id: string, token: string) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.DELETE_NOTE_URL}/${id}`,
      token,
      RequestMethod.DELETE
    );
  }

  public static async editNote(note: Note, token: string) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.EDIT_NOTE_URL}`,
      token,
      RequestMethod.PATCH,
      note
    );
  }

  public static async getAllInvites(token: string) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.GET_INVITES}`,
      token,
      RequestMethod.GET
    );
  }
}
