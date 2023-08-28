import {
  Button,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import withSnackbar from "../Common/SnackBarWrapper";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { Invite, InviteStatus } from "../../models/Invite";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import { InviteItem } from "./InviteItem";
import { inviteUser } from "../../hubs/InviteUser";
import { NotificationsHeader } from "./NotificationsHeader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Notifications({ setMessage }: { setMessage: (msg: string) => void }) {
  const [data, setData] = useState<Invite[]>();
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const decodedToken: { Name: string } = jwt_decode(auth.accessToken)!;
  const username = decodedToken.Name;
  const axiosPrivate = useAxiosPrivate();
  //todo populate invite with data of a speaker user wants to invite
  const invite: Invite = {
    id: null,
    userId: "eba6d3a8-7625-4608-b911-9eefc043b1c9",
    userName: username,
    inviteeId: "21404fca-d133-4718-8955-6cdd7c7ba5da",
    inviteeName: "snape",
    status: InviteStatus.PENDING_ANSWER,
    timestamp: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
    time: DateFormatUtil.getCurrentDateTimeOffset().toISOString(),
    place: "Hogwarts",
  };
  const inviteSpeaker = () =>
    inviteUser(auth.accessToken, { setMessage }, invite)();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllInvites = async () => {
      try {
        const response = await axiosPrivate.get("/GetAllInvites", {
          signal: controller.signal,
        });

        isMounted && setLoading(false);
        isMounted && setError(null);
        isMounted && setData(response.data);
      } catch (err: any) {
        isMounted && setError(err.message);
        isMounted && setData([]);
        navigate("/sign-in", { state: { from: location }, replace: true });
      } finally {
        isMounted && setLoading(false);
      }
    };

    getAllInvites();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/notifications")) {
        controller.abort();
      }
    };
  }, [location.pathname, data, auth]);

  return (
    <>
      <ListItem>
        <Typography>Speaker: Snape</Typography>
        <Button onClick={inviteSpeaker}>Invite</Button>
      </ListItem>
      <TableContainer component={Paper} sx={{ marginX: 50, maxWidth: 850 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <NotificationsHeader />
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
