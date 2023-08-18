import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Lecture information
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export function EventInformation({
  name,
  date,
  destination,
  isOpened,
  setOpen,
  isAdded,
  updateSchedule,
}: {
  name: string;
  date: string;
  destination: string;
  isOpened: boolean;
  setOpen: (a: boolean) => void;
  isAdded: boolean;
  updateSchedule: (a: boolean) => void;
}) {
  const handleClose = () => {
    setOpen(false);
    updateSchedule(isAdded);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={isOpened}>
        <CloseButton handleClose={handleClose} />
        <DialogTitle>{name}</DialogTitle>
        <DialogContent dividers>
          <Typography>{destination}</Typography>
          <Typography>Time: {date}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {isAdded ? "Remove from schedule" : "Add to schedule"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
