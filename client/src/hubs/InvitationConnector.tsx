import * as signalR from "@microsoft/signalr";
import config from "../config/local.json";
const URL = config.INVITATIONS_HUB;
class Connector {
  private connection: signalR.HubConnection;
  static instance: Connector;
  public events: (onMessageReceived: (message: string) => void) => void;

  constructor(token: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL, { accessTokenFactory: () => token }) // todo refresh token in accessTokenFactory
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => console.log(err));
    this.events = (onMessageReceived) => {
      this.connection.on("InviteReceived", (message) => {
        console.log(message);
        onMessageReceived(message);
      });
    };
  }

  public newMessage = (messages: string) => {
    this.connection
      .send("NotifyInvitee", messages)
      .then((x) => console.log("sent"));
  };

  public static getInstance(token: string): Connector {
    if (!Connector.instance) Connector.instance = new Connector(token);
    return Connector.instance;
  }
}

export default Connector.getInstance;
