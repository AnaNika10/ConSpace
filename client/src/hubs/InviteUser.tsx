import { Invite } from "../models/Invite";
import InvitationConnector from "./InvitationConnector";
import jwt_decode from "jwt-decode";

export function inviteUser(
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
