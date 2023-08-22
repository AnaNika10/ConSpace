import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import InvitationConnector from "../../hubs/InvitationConnector";
import useAuth from "../../hooks/useAuth";
import withSnackbar from "../Common/SnackBarWrapper";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";

function Notifications({ setMessage }: { setMessage: (msg: string) => void }) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const { newMessage } = InvitationConnector(auth.accessToken);
  const inviteSpeaker = () => {
    const decodedToken: { Name: string } = jwt_decode(auth.accessToken)!;
    const username = decodedToken.Name;

    const msg = `Invite received from: ${username}`;
    setMessage(msg);
    newMessage(msg);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserDataProvider.getAllInvites(auth.accessToken);
        if (!response.ok) {
          throw new Error(`Failed fetching data. Status: ${response.status}`);
        }
        const actual = await response.json();
        setLoading(false);
        setError(null);
        setData(actual);
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data, auth]);

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
