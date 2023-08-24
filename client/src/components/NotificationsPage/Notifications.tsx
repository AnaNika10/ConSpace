import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import InvitationConnector from "../../hubs/InvitationConnector";
import useAuth from "../../hooks/useAuth";
import withSnackbar from "../Common/SnackBarWrapper";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";
import { Invite, InviteStatus } from "../../models/Invite";
import { CheckCircle, Close, Pending } from "@mui/icons-material";
import { DateFormatUtil } from "../Common/DateFormatUtil";

function ListHeader() {
  return (
    <Card>
      <ListItem alignItems="flex-start">
        <Stack spacing={2} direction={"row"} justifyContent="space-around">
          <ListItemText sx={{ width: 500 }} primary={"Invite from:"} />
          <ListItemText sx={{ width: 500 }} primary={"Received:"} />
        </Stack>
      </ListItem>
    </Card>
  );
}

function StatusIcon({ status }: { status: InviteStatus }) {
  switch (status) {
    case InviteStatus.MEET_SCHEDULED:
      return <Close></Close>;
    case InviteStatus.DECLINED:
      return <CheckCircle></CheckCircle>;
    default:
      return <Pending></Pending>;
  }
}
function InviteItem({ invite }: { invite: Invite }) {
  return (
    <>
      <ListItem alignItems="flex-start" key={invite.id}>
        <Stack spacing={2} direction={"row"}>
          <StatusIcon status={invite.status}></StatusIcon>
          <ListItemText sx={{ width: 500 }} primary={invite.invitee} />
          <ListItemText
            sx={{ width: 500 }}
            primary={
              DateFormatUtil.extractDate(invite.timestamp) +
              ", " +
              DateFormatUtil.extractTime(invite.timestamp)
            }
          />
        </Stack>
      </ListItem>
    </>
  );
}

function Notifications({ setMessage }: { setMessage: (msg: string) => void }) {
  const [data, setData] = useState<Invite[]>();
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const { newMessage } = InvitationConnector(auth.accessToken);
  const inviteSpeaker = () => {
    const decodedToken: { Name: string } = jwt_decode(auth.accessToken)!;
    const username = decodedToken.Name;

    const msg = `Invite received from: ${username}`;
    const invite: Invite = {
      id: null,
      userId: "71e70a13-3b32-4c52-bf85-77eb0a751355",
      userName: username,
      inviteeId: "dd84ec3f-f976-4678-8a7f-5c2fe5084595",
      inviteeName: "snape",
      status: InviteStatus.PENDING_ANSWER,
      timestamp: "2023-08-23T09:44:38",
    };
    setMessage(msg);
    newMessage(JSON.stringify(invite), msg);
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
          <ListHeader />
          {!isLoading ? (
            data?.map((it) => <InviteItem invite={it}></InviteItem>)
          ) : (
            <></>
          )}
        </List>
      </Grid>
    </>
  );
}

export default withSnackbar(Notifications);
