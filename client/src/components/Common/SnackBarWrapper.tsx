import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

const withSnackbar = (WrappedComponent: any) => {
  return (...props: any[]) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = (event: any, reason: string) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
    const updateMessage = (msg: string) => setMessage(msg);
    useEffect(() => {
      setMessage(message);
    }, [message]);
    return (
      <>
        <WrappedComponent
          {...props}
          message={message}
          setMessage={updateMessage}
          setOpen={() => setOpen(true)}
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
