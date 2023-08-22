import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import InvitationConnector from "../../hubs/InvitationConnector";
import useAuth from "../../hooks/useAuth";
import withSnackbar from "../Common/SnackBarWrapper";

function Notifications({
  setMessage,
  message,
}: {
  setMessage: (msg: string) => void;
  message: string;
}) {
  const { auth } = useAuth();
  const { newMessage } = InvitationConnector(auth.accessToken);
  const inviteSpeaker = () => {
    setMessage(`Invite received from: ${auth.accessToken}`);
    newMessage(message);
  };
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
