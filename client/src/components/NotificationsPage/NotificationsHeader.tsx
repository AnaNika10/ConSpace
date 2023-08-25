import { TableHead, TableRow, TableCell } from "@mui/material";

export function NotificationsHeader() {
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell>Status</TableCell>
        <TableCell align="center">Invite from</TableCell>
        <TableCell align="center">Sent to</TableCell>
        <TableCell align="center">Received at</TableCell>
        <TableCell align="center">Meeting place</TableCell>
        <TableCell align="center">Meeting time</TableCell>
      </TableRow>
    </TableHead>
  );
}
