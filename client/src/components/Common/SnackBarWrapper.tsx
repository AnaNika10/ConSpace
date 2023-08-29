import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import InvitationConnector from "../../hubs/InvitationConnector";
import useAuth from "../../hooks/useAuth";

const withSnackbar = (WrappedComponent: any) => {
  return (...props: any[]) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { auth } = useAuth();

    const isNotAuthorized =
      auth.accessToken === null ||
      auth.accessToken === undefined ||
      auth.accessToken === "";

    const handleClose = (event: any, reason: string) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
    const updateMessage = (msg: string) => setMessage(msg);

    useEffect(() => {
      if (!isNotAuthorized) {
        const { events } = InvitationConnector(auth.accessToken);
        events((invite, message) => {
          console.log("received");
          setMessage(message);
          setOpen(true);
        });
      }
    });

    return (
      <>
        {isNotAuthorized ? (
          <>
            <WrappedComponent
              {...props}
              message={message}
              setMessage={updateMessage}
            />
          </>
        ) : (
          <>
            <WrappedComponent
              {...props}
              message={message}
              setMessage={updateMessage}
            />
            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              message={message}
            />
          </>
        )}
      </>
    );
  };
};
export default withSnackbar;
