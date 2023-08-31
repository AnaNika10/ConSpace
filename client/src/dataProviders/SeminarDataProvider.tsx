import config from "../config/local.json";
import { Appointment } from "../models/Appointment";
import { Seminar } from "../models/Seminar";
import { RequestMethod, RequestWrapper } from "./RequestWrapper";

export class SeminarDataProvider {
  private static readonly gateway = config.API_GATEWAY;

  public static async fetchAllExhibitors() {
    return await RequestWrapper.fetchPublicData(
      `${this.gateway}/Exhibitor`,
      RequestMethod.GET
    );
  }
  public static async fetchAllSpeakers() {
    return await RequestWrapper.fetchPublicData(
      `${this.gateway}/Speaker`,
      RequestMethod.GET
    );
  }

  public static async deleteSeminar(id: string, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Seminar/${id}`,
      token,
      RequestMethod.DELETE
    );
  }

  public static async insertSeminar(s: Seminar, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Seminar`,
      token,
      RequestMethod.POST,
      s
    );
  }
  public static async updateSeminar(s: Seminar, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Seminar`,
      token,
      RequestMethod.PUT,
      s
    );
  }

  public static async deleteAppointment(id: string, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/DeleteSeminarFromSchedule/${id}`,
      token,
      RequestMethod.DELETE
    );
  }

  public static async insertAppointment(a: Appointment, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/AddSeminarToSchedule`,
      token,
      RequestMethod.POST,
      a
    );
  }

  public static async fetchAllSeminars() {
    return RequestWrapper.fetchPublicData(
      `${this.gateway}/Seminar`,
      RequestMethod.GET
    );
  }
}
