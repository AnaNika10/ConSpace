import { Grid, Box, Dialog, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { inviteUser } from "../../hubs/InviteUser";
import { InviteStatus, Invite } from "../../models/Invite";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import { TimeAndPlaceForm } from "./TimeAndPlaceForm";

export function RequestTimePlaceForm({
  open,
  setOpen,
  status,
  inviteId,
  username,
  token,
  inviteeEmail,
  setMessage

}: {
  open: boolean;
  setOpen: (a: boolean) => void;
  status: InviteStatus;
  inviteId: string | null;
  username: string;
  token: string;
  inviteeEmail: string;
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
        userId: "",
        userName: username,
        inviteeId: "dd84ec3f-f976-4678-8a7f-5c2fe5084595",
        inviteeName: "snape_negotiation",
        status: InviteStatus.PLACE_AND_TIME_NEGOTIATION,
        timestamp: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
        time: DateFormatUtil.getUpdatedTime(time!).toISOString(),
        place: place!,
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
