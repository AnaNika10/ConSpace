import * as signalR from "@microsoft/signalr";
import config from "../config/local.json";
const URL = config.INVITATIONS_HUB;
class Connector {
  private connection: signalR.HubConnection;
  static instance: Connector;
  public events: (
    onMessageReceived: (invite: string, message: string) => void
  ) => void;

  constructor(token: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL, { accessTokenFactory: () => token }) // todo refresh token in accessTokenFactory
      .withAutomaticReconnect()
      .build();

    this.connection.start().catch((err) => console.log(err));

    this.events = (onMessageReceived) => {
      this.connection.on("InviteReceived", (invite, message) => {
        console.log(message);
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

  public reconnect = () => {
    this.connection.start().then(() => console.log("reconnected"));
  };
  public static getInstance(token: string): Connector {
    if (!Connector.instance) Connector.instance = new Connector(token);
    return Connector.instance;
  }
}

export default Connector.getInstance;