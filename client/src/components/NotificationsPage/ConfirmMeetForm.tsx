import {
  Dialog,
  Card,
  DialogActions,
  Button,
  Grid,
  Box,
  Stack,
  DialogContent,
  FormControl,
  TextField,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { InviteStatus, Invite } from "../../models/Invite";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import jwt_decode from "jwt-decode";
import { inviteUser } from "../../hubs/InviteUser";
import { useState } from "react";
import { Add, Token } from "@mui/icons-material";

export function TimeAndPlaceForm({
  error,
  onChange,
}: {
  error: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <DialogContent>
        <FormControl>
          <Stack spacing={5}>
            <TextField
              error={error}
              onChange={onChange}
              helperText="Field must be in format HH:mm"
              id="time"
              label="Time"
              variant="filled"
              name="time"
            />
            <TextField
              error={error}
              onChange={onChange}
              helperText="Field must be in format YYYY-MM-DD"
              id="place"
              name="place"
              variant="filled"
              size="medium"
              label="Place"
            />
          </Stack>
        </FormControl>
      </DialogContent>
    </>
  );
}

function RequestTimePlaceForm({
  open,
  setOpen,
  status,
  isInitiator,
  inviteId,
  username,
  token,
  setMessage,
}: {
  open: boolean;
  setOpen: (a: boolean) => void;
  status: InviteStatus;
  isInitiator: boolean;
  inviteId: string;
  username: string;
  token: string;
  setMessage: (msg: string) => void;
}) {
  const [error, setError] = useState(false);
  const isFilled = (e: any) => {
    if (e.target.value !== "") {
      setError(false);
    }
  };
  const handleNewRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let time = null;
    let place = null;
    if (data.get("time") !== undefined) {
      time = data.get("time")?.toString();
    }
    if (data.get("place") !== undefined) {
      place = data.get("place")?.toString();
    }
    if (time === "" || place === "") {
      setError(true);
      return;
    }
    if (
      status !== InviteStatus.DECLINED &&
      status !== InviteStatus.MEET_SCHEDULED
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
      inviteUser(token, { setMessage }, invite)();
      setOpen(false);
    }
  };
  return (
    <div>
      <Grid justifyContent="space-around" paddingTop={3}>
        <Box>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <Box component="form" onSubmit={handleNewRequest}>
              <TimeAndPlaceForm error={error} onChange={isFilled} />
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Send</Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
      </Grid>
    </div>
  );
}
export function ConfirmMeetForm({
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
  const [openRequest, setOpenRequest] = useState(false);
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
    setOpenRequest(true);
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
          <RequestTimePlaceForm
            open={openRequest}
            setOpen={setOpenRequest}
            status={status}
            isInitiator={isInitiator}
            inviteId={inviteId}
            username={username}
            token={auth.accessToken}
            setMessage={setMessage}
          ></RequestTimePlaceForm>
        </Card>
      </Dialog>
    </>
  );
}
