import {
  Card,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
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
          <ListItemText sx={{ width: 500 }} primary={"Status"} />
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
      return (
        <>
          <Tooltip title="Meet scheduled">
            <Close />
          </Tooltip>
        </>
      );
    case InviteStatus.DECLINED:
      return (
        <>
          <Tooltip title="Declined">
            <CheckCircle />
          </Tooltip>
        </>
      );
    default:
      return (
        <>
          <Tooltip title="Waiting for answer">
            <Pending />
          </Tooltip>
        </>
      );
  }
}
function InviteItem({ invite }: { invite: Invite }) {
  return (
    <>
      <TableCell component="th" scope="row">
        <StatusIcon status={invite.status}></StatusIcon>
      </TableCell>
      <TableCell align="center">{invite.inviteeName}</TableCell>
      <TableCell align="center">
        {DateFormatUtil.extractDate(invite.timestamp) +
          ", " +
          DateFormatUtil.extractTime(invite.timestamp)}
      </TableCell>
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
      <TableContainer component={Paper} sx={{ paddingLeft: 20 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="center">Invite from:</TableCell>
              <TableCell align="center">Received at:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              data?.map((it) => {
                return (
                  <>
                    <TableRow
                      key={it.inviteeId + it.userId + it.timestamp}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <InviteItem invite={it}></InviteItem>
                    </TableRow>
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
