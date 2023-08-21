import {
  Button,
  Grid,
  List,
  ListItem,
  Snackbar,
  Typography,
} from "@mui/material";
import InvitationConnector from "../../hubs/InvitationConnector";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export function Notifications() {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Invite received");
  const { newMessage, events } = InvitationConnector(auth.accessToken);
  const inviteSpeaker = () => {
    newMessage("new");
  };
  useEffect(() => {
    events((message) => {
      setOpen(true);
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={`Invite received from: ${message}`}
      />
    </>
  );
}
