import config from "../config/local.json";
import { Speaker } from "../models/Speaker";
import { RequestMethod, RequestWrapper } from "./RequestWrapper";

export class SpeakerDataProvider {
  private static readonly gateway = config.API_GATEWAY;

  public static async fetchSpeakers(token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Speaker`,
      token,
      RequestMethod.GET
    );
  }
  public static async deleteSpeaker(id: number, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Speaker/${id}`,
      token,
      RequestMethod.DELETE
    );
  }
  public static async updateSpeaker(s: Speaker, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Speaker`,
      token,
      RequestMethod.PUT,
      s
    );
  }
  public static async insertSpeaker(s: Speaker, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Speaker`,
      token,
      RequestMethod.POST,
      s
    );
  }

  public static async fetchFAQs() {
    return RequestWrapper.fetchPublicData(
      `${this.gateway}/FAQ`,
      RequestMethod.GET
    );
  }
}
