import axios from "axios";

export enum RequestMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  PUT = "PUT",
  PATCH = "PATCH",
}

export class RequestWrapper {
  public static async fetchPublicData(
    url: string,
    method: RequestMethod,
    body?: any
  ) {
    switch (method) {
      case RequestMethod.POST:
        return axios.post(url, JSON.stringify(body), {
          headers: { "Content-Type": "application/json" },
        });
      case RequestMethod.DELETE:
        return axios.delete(url, {
          headers: { "Content-Type": "application/json" },
        });
      case RequestMethod.GET:
        return axios.get(url, {
          headers: { "Content-Type": "application/json" },
        });
      case RequestMethod.PUT:
        return axios.put(url, JSON.stringify(body), {
          headers: { "Content-Type": "application/json" },
        });
      default:
        return;
    }
  }

  public static async fetchPrivateData(
    url: string,
    token: string,
    method: RequestMethod,
    body?: any
  ) {
    switch (method) {
      case RequestMethod.POST:
        return axios.post(url, JSON.stringify(body), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      case RequestMethod.DELETE:
        return axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      case RequestMethod.GET:
        return axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      case RequestMethod.PUT:
        return axios.put(url, JSON.stringify(body), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      case RequestMethod.PATCH:
        return axios.patch(url, JSON.stringify(body), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      default:
        return;
    }
  }
}
