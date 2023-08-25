import {
  Button,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import withSnackbar from "../Common/SnackBarWrapper";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";
import { Invite, InviteStatus } from "../../models/Invite";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import { InviteItem } from "./InviteItem";
import { inviteUser } from "../../hubs/InviteUser";
import { NotificationsHeader } from "./NotificationsHeader";

function Notifications({ setMessage }: { setMessage: (msg: string) => void }) {
  const [data, setData] = useState<Invite[]>();
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const decodedToken: { Name: string } = jwt_decode(auth.accessToken)!;
  const username = decodedToken.Name;
  //todo populate invite with data of a speaker user wants to invite
  const invite: Invite = {
    id: null,
    userId: "71e70a13-3b32-4c52-bf85-77eb0a751355",
    userName: username,
    inviteeId: "dd84ec3f-f976-4678-8a7f-5c2fe5084595",
    inviteeName: "snape",
    status: InviteStatus.PENDING_ANSWER,
    timestamp: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
    time: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
    place: "Hogwarts",
  };
  const inviteSpeaker = () =>
    inviteUser(auth.accessToken, { setMessage }, invite)();

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
      <ListItem>
        <Typography>Speaker: Snape</Typography>
        <Button onClick={inviteSpeaker}>Invite</Button>
      </ListItem>
      <TableContainer component={Paper} sx={{ marginX: 50, maxWidth: 850 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <NotificationsHeader />
          <TableBody>
            {!isLoading ? (
              data?.map((it) => {
                return (
                  <>
                    <InviteItem
                      invite={it}
                      setMessage={setMessage}
                    ></InviteItem>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default withSnackbar(Notifications);
