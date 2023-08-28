import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import InvitationConnector from "../../hubs/InvitationConnector";
import useAuth from "../../hooks/useAuth";

const withSnackbar = (WrappedComponent: any) => {
  return (...props: any[]) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { auth } = useAuth();
    if (
      auth.accessToken === null ||
      auth.accessToken === undefined ||
      auth.accessToken === ""
    ) {
      return (
        <>
          <WrappedComponent {...props} />
        </>
      );
    }

    const { events } = InvitationConnector(auth.accessToken);

    const handleClose = (event: any, reason: string) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
    const updateMessage = (msg: string) => setMessage(msg);
    useEffect(() => {
      events((invite, message) => {
        console.log("received");
        setMessage(message);
        setOpen(true);
      });
    });
    return (
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
    );
  };
};
export default withSnackbar;
