import { TableRow, TableCell } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Invite, InviteStatus } from "../../models/Invite";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import { StatusIcon } from "./StatusIcon";
import jwt_decode from "jwt-decode";
import { ConfirmMeetForm } from "./ConfirmMeetForm";

export function InviteItem({
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
        key={invite.inviteeEmail + invite.userEmail + invite.timestamp}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          <StatusIcon status={invite.status}></StatusIcon>
        </TableCell>
        <TableCell align="center">
          {username === invite.userName ? "You" : invite.userName}
        </TableCell>
        <TableCell align="center">
          {username === invite.inviteeName ? "Me" : invite.inviteeName}
        </TableCell>
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
        open={
          open &&
          (invite.status === InviteStatus.PENDING_ANSWER ||
            invite.status === InviteStatus.PLACE_AND_TIME_NEGOTIATION)
        }
        handleClose={() => setOpen(false)}
        setMessage={setMessage}
        inviteId={invite.id!}
        status={invite.status}
        isInitiator={username === invite.userName}
      ></ConfirmMeetForm>
    </>
  );
}
