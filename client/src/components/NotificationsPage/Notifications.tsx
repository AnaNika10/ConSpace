import {
  Button,
  Card,
  Dialog,
  DialogActions,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
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

function StatusIcon({ status }: { status: InviteStatus }) {
  switch (status) {
    case InviteStatus.MEET_SCHEDULED:
      return (
        <>
          <Tooltip title="Meet scheduled">
            <CheckCircle />
          </Tooltip>
        </>
      );
    case InviteStatus.DECLINED:
      return (
        <>
          <Tooltip title="Declined">
            <Close />
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
function ConfirmMeetForm({
  open,
  handleClose,
  setMessage,
  inviteId,
  status,
  isInitiator,
}: {
  open: boolean;
  handleClose: () => void;
  setMessage: (msg: string) => void;
  inviteId: string;
  status: InviteStatus;
  isInitiator: boolean;
}) {
  const { auth } = useAuth();
  const decodedToken: { Name: string } = jwt_decode(auth.accessToken)!;
  const username = decodedToken.Name;
  const handleConfirm = () => {
    if (status !== InviteStatus.MEET_SCHEDULED && !isInitiator) {
      const invite: Invite = {
        id: inviteId,
        userId: "71e70a13-3b32-4c52-bf85-77eb0a751355",
        userName: username,
        inviteeId: "dd84ec3f-f976-4678-8a7f-5c2fe5084595",
        inviteeName: "snape_confirmed",
        status: InviteStatus.MEET_SCHEDULED,
        timestamp: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
        time: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
        place: "Hogwarts",
      };
      inviteUser(auth.accessToken, { setMessage }, invite)();
    }
    handleClose();
  };
  const handleDecline = () => {
    if (status !== InviteStatus.MEET_SCHEDULED && !isInitiator) {
      const invite: Invite = {
        id: inviteId,
        userId: "71e70a13-3b32-4c52-bf85-77eb0a751355",
        userName: username,
        inviteeId: "dd84ec3f-f976-4678-8a7f-5c2fe5084595",
        inviteeName: "snape_declined",
        status: InviteStatus.DECLINED,
        timestamp: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
        time: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
        place: "Hogwarts",
      };
      inviteUser(auth.accessToken, { setMessage }, invite)();
    }
    handleClose();
  };
  const handleNewRequest = () => {
    if (
      status !== InviteStatus.DECLINED &&
      status !== InviteStatus.MEET_SCHEDULED &&
      !isInitiator
    ) {
      const invite: Invite = {
        id: inviteId,
        userId: "71e70a13-3b32-4c52-bf85-77eb0a751355",
        userName: username,
        inviteeId: "dd84ec3f-f976-4678-8a7f-5c2fe5084595",
        inviteeName: "snape_negotiation",
        status: InviteStatus.PLACE_AND_TIME_NEGOTIATION,
        timestamp: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
        time: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
        place: "Hogwarts",
      };
      inviteUser(auth.accessToken, { setMessage }, invite);
    }
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Card>
          <DialogActions>
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={handleDecline} type="submit">
              Decline
            </Button>
            <Button onClick={handleNewRequest} type="submit">
              Request another meeting place and/or time
            </Button>
          </DialogActions>
        </Card>
      </Dialog>
    </>
  );
}
function InviteItem({
  invite,
  setMessage,
}: {
  invite: Invite;
  setMessage: (msg: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const decodedToken: { Name: string } = jwt_decode(auth.accessToken)!;
  const username = decodedToken.Name;

  return (
    <>
      <TableRow
        key={invite.inviteeId + invite.userId + invite.timestamp}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          <StatusIcon status={invite.status}></StatusIcon>
        </TableCell>
        <TableCell align="center">
          {username === invite.userName ? "You" : invite.inviteeName}
        </TableCell>
        <TableCell align="center">{invite.inviteeName}</TableCell>
        <TableCell align="center">
          {DateFormatUtil.extractDate(invite.timestamp) +
            ", " +
            DateFormatUtil.extractTime(invite.timestamp)}
        </TableCell>
        <TableCell align="center">
          {invite.place ? invite.place : "Not set"}
        </TableCell>
        <TableCell align="center">
          {invite.time
            ? DateFormatUtil.extractDate(invite.time) +
              ", " +
              DateFormatUtil.extractTime(invite.time)
            : "Not set"}
        </TableCell>
      </TableRow>
      <ConfirmMeetForm
        open={open}
        handleClose={() => setOpen(false)}
        setMessage={setMessage}
        inviteId={invite.id!}
        status={invite.status}
        isInitiator={username === invite.userName}
      ></ConfirmMeetForm>
    </>
  );
}

function inviteUser(
  token: string,
  { setMessage }: { setMessage: (msg: string) => void },
  invite: Invite
) {
  const { newMessage } = InvitationConnector(token);
  const invitation = () => {
    const decodedToken: { Name: string } = jwt_decode(token)!;
    const username = decodedToken.Name;

    const msg = `Notification from: ${username}`;

    setMessage(msg);
    newMessage(JSON.stringify(invite), msg);
  };
  return invitation;
}
function Notifications({ setMessage }: { setMessage: (msg: string) => void }) {
  const [data, setData] = useState<Invite[]>();
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const { newMessage } = InvitationConnector(auth.accessToken);
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
          <TableHead>
            <TableRow key="header">
              <TableCell>Status</TableCell>
              <TableCell align="center">Invite from:</TableCell>
              <TableCell align="center">Sent to:</TableCell>
              <TableCell align="center">Received at:</TableCell>
              <TableCell align="center">Meeting place:</TableCell>
              <TableCell align="center">Meeting time:</TableCell>
            </TableRow>
          </TableHead>
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
