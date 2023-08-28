import { Dialog, Card, DialogActions, Button, Grid, Box } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { InviteStatus, Invite } from "../../models/Invite";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import jwt_decode from "jwt-decode";
import { inviteUser } from "../../hubs/InviteUser";
import { useState } from "react";
import { RequestTimePlaceForm } from "./RequestTimePlaceForm";

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
  const mejl = "promeni@mail.com";
  const handleConfirm = () => {
    if (status !== InviteStatus.MEET_SCHEDULED && !isInitiator) {
      const invite: Invite = {
        id: inviteId,
        userId: "eba6d3a8-7625-4608-b911-9eefc043b1c9",
        userName: username,
        inviteeId: "21404fca-d133-4718-8955-6cdd7c7ba5da",
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
        userId: "eba6d3a8-7625-4608-b911-9eefc043b1c9",
        userName: username,
        inviteeId: "21404fca-d133-4718-8955-6cdd7c7ba5da",
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
            inviteId={inviteId}
            inviteeEmail={mejl}
            username={username}
            token={auth.accessToken}
            setMessage={setMessage}
          ></RequestTimePlaceForm>
        </Card>
      </Dialog>
    </>
  );
}
