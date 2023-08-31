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
  invite,
  isInitiator,
}: {
  open: boolean;
  handleClose: () => void;
  setMessage: (msg: string) => void;
  invite: Invite;
  isInitiator: boolean;
}) {
  const { auth } = useAuth();
  const [openRequest, setOpenRequest] = useState(false);
  const handleConfirm = () => {
    if (invite.status !== InviteStatus.MEET_SCHEDULED && !isInitiator) {
      invite.status = InviteStatus.MEET_SCHEDULED;
      inviteUser(auth.accessToken, { setMessage }, invite)();
    }
    handleClose();
  };
  const handleDecline = () => {
    if (status !== InviteStatus.MEET_SCHEDULED && !isInitiator) {
      invite.status = InviteStatus.DECLINED;
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
            status={invite.status}
            inviteId={invite.id}
            inviteeEmail={invite.inviteeEmail}
            username={invite.userName}
            token={auth.accessToken}
            setMessage={setMessage}
          ></RequestTimePlaceForm>
        </Card>
      </Dialog>
    </>
  );
}
