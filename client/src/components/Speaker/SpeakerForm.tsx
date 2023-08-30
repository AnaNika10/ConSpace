import {
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  IconButton,
  Toolbar,
  FormControl,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Speaker } from "../../models/Speaker";
import { useState } from "react";
import { SpeakerDataProvider } from "../../dataProviders/SpeakerDataProvider";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { RequestTimePlaceForm } from "../NotificationsPage/RequestTimePlaceForm";
import { InviteStatus } from "../../models/Invite";

const CloseButton = ({ setClose }: { setClose: () => void }) => {
  return (
    <>
      <Toolbar>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Speaker information
        </Typography>
        <IconButton edge="end" color="inherit" onClick={setClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </>
  );
};

export function SpeakerForm({
  speaker,
  isOpened,
  displayEventInfo,
  setMessage,
}: {
  speaker: Speaker;
  isOpened: boolean;
  displayEventInfo: (a: boolean) => void;
  setMessage: (msg: string) => void;
}) {
  const { auth } = useAuth();
  const [openRequest, setOpenRequest] = useState(false);
  const [error, setError] = useState({name:false, email:false, position:false,company:false, bioinfo:false});
  const original: Speaker = JSON.parse(
    JSON.stringify(speaker)
  ) as typeof speaker;
  const [currentSpeaker, setCurrentSpeaker] = useState(original);
  const decoded: any = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const isUser = role === "User";
  const inviteId = null;
  const status = InviteStatus.PENDING_ANSWER;
  const decodedToken: { Name: string } = jwtDecode(auth.accessToken)!;
  const username = decodedToken.Name;
  const isInsert =
    speaker.speakerId === null || speaker.speakerId === undefined;
  const handleClose = (event: object, reason: string) => {
    if (reason && reason == "backdropClick") return;
  };
  const setClose = (isSaved: boolean) => {
    displayEventInfo(false);
    if (!isSaved) {
      setCurrentSpeaker(original);
    }
  };
  const DeleteSpeaker = async () => {
    const data = currentSpeaker.speakerId!;
    SpeakerDataProvider.deleteSpeaker(data, auth.accessToken);
    setClose(true);
  };
  const UpdateSpeaker = async () => {
    var result = Object.values(error);
    if (result.includes(true))
    {
      return;
    }
    if (!currentSpeaker.speakerId) {
      SpeakerDataProvider.insertSpeaker(currentSpeaker, auth.accessToken);
      setClose(false);
    } else {
      SpeakerDataProvider.updateSpeaker(currentSpeaker, auth.accessToken);
      setClose(true);
    }
  };
  const handleNewRequest = () => {
    setOpenRequest(true);
  };
  const onChange = (e: any) => {
    if ( e.target.name ==='name' && !e.target.value.includes(" ")) {
      setError({
        ...error,
        name: true,
      });
      return;
    }
    if (e.target.name ==='email' && !e.target.value.includes("@")) {
      setError({
        ...error,
        email: true,
      });
      return;
    }
    if (e.target.value === "") {
      setError({
        ...error,
        [e.target.name] : true
      });
      return;
    }
    if (e.target.value !== "") {
      setError({
        ...error,
        [e.target.name] : false
      });
    }
    const value = e.target.value;
    setCurrentSpeaker({
      ...currentSpeaker,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={isOpened}>
        <CloseButton setClose={() => setClose(false)} />
        <DialogContent>
          <FormControl >
            <Box
              minHeight={400}
              marginTop={5}
              component="form"
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={1} rowSpacing={5}>
                <Grid item xs={6}>
                  <TextField
                    id="speaker-name"
                    label="Full name"
                    error={error.name}
                    defaultValue={currentSpeaker.name}
                    helperText="Enter the full name of the speaker"
                    name="name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="speaker-email"
                    label="Email"
                    error={error.email}
                    helperText="Enter a valid email address"
                    defaultValue={currentSpeaker.email}
                    name="email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="speaker-position"
                    label="Position"
                    error={error.position}
                    defaultValue={currentSpeaker.position}
                    name="position"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="speaker-company"
                    label="Company"
                    name="company"
                    error={error.company}
                    defaultValue={currentSpeaker.company}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    name="bioInfo"
                    error={error.bioinfo}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                    defaultValue={currentSpeaker.bioInfo}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    label="About speaker"
                    rows="8"
                  />
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          {isAdmin && (
            <Button onClick={UpdateSpeaker} variant="contained">
              Save
            </Button>
          )}
          {isAdmin && !isInsert && (
            <Button onClick={DeleteSpeaker} variant="contained">
              Delete
            </Button>
          )}
          {isUser && (
            <>
              {" "}
              <Button onClick={handleNewRequest} variant="contained">
                Invite
              </Button>
              <RequestTimePlaceForm
                open={openRequest}
                setOpen={setOpenRequest}
                status={status}
                inviteId={inviteId}
                username={username}
                token={auth.accessToken}
                setMessage={setMessage}
                inviteeEmail={speaker.email}
                inviteeName={speaker.name}
              ></RequestTimePlaceForm>{" "}
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}


