import * as signalR from "@microsoft/signalr";
import config from "../config/local.json";
import jwt from "jwt-decode";
const URL = config.INVITATIONS_HUB;
class Connector {
  private connection: signalR.HubConnection;
  static instance: Connector;
  public events: (
    onMessageReceived: (invite: string, message: string) => void
  ) => void;

  constructor(token: string) {
    const decodedToken = jwt(token);
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this.connection.start().catch((err) => console.log(err));

    this.events = (onMessageReceived) => {
      this.connection.on("InviteReceived", (invite, message) => {
        onMessageReceived(invite, message);
      });
    };
  }

  public newMessage = (invite: string, message: string) => {
    this.connection
      .send("NotifyInvitee", invite, message)
      .then((x) => console.log("sent"));
  };

  public disconnect = () => {
    this.connection.stop().then(() => console.log("disconnected"));
  };

  public reconnect = (token: string) => {
    if (this.connection.state === "Disconnected") {
      Connector.instance = new Connector(token);
      console.log("reconnected");
    }
  };
  public static getInstance(token: string): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector(token);
    }
    return Connector.instance;
  }
}

export default Connector.getInstance;
