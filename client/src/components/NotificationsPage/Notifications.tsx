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
import { useState, useEffect } from "react";
import { Invite } from "../../models/Invite";
import { InviteItem } from "./InviteItem";
import { NotificationsHeader } from "./NotificationsHeader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Notifications({ setMessage }: { setMessage: (msg: string) => void }) {
  const [data, setData] = useState<Invite[]>();
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
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
