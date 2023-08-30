import config from "../config/local.json";
import { RequestWrapper, RequestMethod } from "./RequestWrapper";

export class IdentityDataProvider {
  private static readonly gateway = config.API_GATEWAY;
  private static readonly REGISTER_USER_URL = "/RegisterUser";
  private static readonly LOGIN_URL = "/Login";
  private static readonly LOGOUT_URL = "/Logout";
  private static readonly REFRESH_URL = "/RefreshToken";
  private static readonly UPDATE_USER_NAME_SURNAME_URL = "/UpdateName";
  private static readonly UPDATE_USER_PASSWORD_URL = "/UpdatePassword";

  public static async loginUser(body: any) {
    return RequestWrapper.fetchPublicData(
      `${this.gateway}${this.LOGIN_URL}`,
      RequestMethod.POST,
      body
    );
  }

  public static async registerUser(body: any) {
    return RequestWrapper.fetchPublicData(
      `${this.gateway}${this.REGISTER_USER_URL}`,
      RequestMethod.POST,
      body
    );
  }

  public static async updateUsername(token: string, body: any) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.UPDATE_USER_NAME_SURNAME_URL}`,
      token,
      RequestMethod.PUT,
      body
    );
  }

  public static async updatePassword(token: string, body: any) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.UPDATE_USER_PASSWORD_URL}`,
      token,
      RequestMethod.PUT,
      body
    );
  }

  public static async refreshToken(body: any) {
    return RequestWrapper.fetchPublicData(
      `${this.gateway}${this.REFRESH_URL}`,
      RequestMethod.POST,
      body
    );
  }

  public static async logout(token: string, body: any) {
    return RequestWrapper.fetchPrivateData(
      `${this.gateway}${this.LOGOUT_URL}`,
      token,
      RequestMethod.POST,
      body
    );
  }
}
