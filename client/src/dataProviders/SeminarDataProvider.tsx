import config from "../config/local.json";
import { RequestMethod, RequestWrapper } from "./RequestWrapper";

export class SeminarDataProvider {
  private static readonly gateway = config.API_GATEWAY;
  private static readonly GET_CONFERENCES_URL = "/Conferences";

  public static async fetchSeminarSchedule(token: string) {
    return await RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.GET_CONFERENCES_URL}`,
      token,
      RequestMethod.GET
    );
  }
}
