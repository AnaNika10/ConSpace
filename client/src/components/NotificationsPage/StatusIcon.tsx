import { CheckCircle, Close, Pending } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { InviteStatus } from "../../models/Invite";

export function StatusIcon({ status }: { status: InviteStatus }) {
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
