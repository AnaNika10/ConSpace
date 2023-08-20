import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Typography } from "@mui/material";
import { Component, ReactNode, useState } from "react";

export class Notifications extends Component {
  constructor(props: any) {
    super(props);
    this.state = { recentGameResults: [] };
  }

  componentDidMount(): void {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:8080/notifications")
      .withAutomaticReconnect()
      .build();

    this.setState({ connection: newConnection });

    newConnection
      .start()
      .then((result) => {
        console.log("Connected!");

        this.state.connection.on('Invite received"', (it) => {
          console.log(it);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }

  render(): ReactNode {
    return (
      <>
        <div>
          <Typography>Notifications</Typography>
        </div>
      </>
    );
  }
}
