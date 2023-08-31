import config from "../config/local.json";
import { Exhibitor } from "../models/Exhibitor";
import { RequestMethod, RequestWrapper } from "./RequestWrapper";

export class ExhibitorDataProvider {
  private static readonly gateway = config.API_GATEWAY;

  public static async fetchExhibitors(token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Exhibitor`,
      token,
      RequestMethod.GET
    );
  }
  public static async deleteExhibitor(id: number, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Exhibitor/${id}`,
      token,
      RequestMethod.DELETE
    );
  }
  public static async updateExhibitor(s: Exhibitor, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Exhibitor`,
      token,
      RequestMethod.PUT,
      s
    );
  }
  public static async insertExhibitor(s: Exhibitor, token: string) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}/Exhibitor`,
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
