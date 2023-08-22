import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import InvitationConnector from "../../hubs/InvitationConnector";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import withSnackbar from "../Common/SnackBarWrapper";

function Notifications({
  setMessage,
  message,
  setOpen,
}: {
  setMessage: (msg: string) => void;
  message: string;
  open: boolean;
  setOpen: () => void;
}) {
  const { auth } = useAuth();
  const { newMessage, events } = InvitationConnector(auth.accessToken);
  const inviteSpeaker = () => {
    setMessage(`Invite received from: ${auth.accessToken}`);
    newMessage(message);
    setOpen();
  };
  useEffect(() => {
    events((message) => {
      setMessage(message);
    });
  });
  return (
    <>
      <Grid paddingLeft={25}>
        <List>
          <ListItem>
            <Typography>Speaker: Snape</Typography>
            <Button onClick={inviteSpeaker}>Invite</Button>
          </ListItem>
        </List>
      </Grid>
    </>
  );
}

export default withSnackbar(Notifications);
