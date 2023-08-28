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

const CloseButton = ({ setClose }: { setClose: ()=> void }) => {
  return (
    <>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Speaker information
          </Typography>
          <IconButton edge="end" color="inherit" onClick = {setClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
    </>
  );
};

export function SpeakerForm({
  speaker,
  isOpened,
  displayEventInfo
}: {
  speaker : Speaker
  isOpened: boolean;
  displayEventInfo : (a:boolean) => void;
}) {
  const { auth } = useAuth();

  const original : Speaker = JSON.parse(JSON.stringify(speaker)) as typeof speaker;
  const [currentSpeaker,setCurrentSpeaker] = useState(original);
  const decoded :any = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const isInsert = speaker.speakerId === null || speaker.speakerId === undefined;
  const handleClose = (event : object, reason : string) => {
    if (reason && reason == "backdropClick") 
        return;

}
const setClose = (isSaved : boolean) => {
  displayEventInfo(false);
  if (!isSaved)
  {
    setCurrentSpeaker(original);
  }
  
  console.log("setClose speak item");
};
const DeleteSpeaker = () => {
  console.log("clicked"+currentSpeaker.speakerId);
  const data = currentSpeaker.speakerId!;
  SpeakerDataProvider.DeleteSpeaker(data,auth.accessToken);
  setClose(true);
};
const UpdateSpeaker = () => {
  if (!currentSpeaker.speakerId)
  {
    SpeakerDataProvider.InsertSpeaker(currentSpeaker, auth.accessToken);
  }
  else
  {
    SpeakerDataProvider.UpdateSpeaker(currentSpeaker, auth.accessToken);
  }

  setClose(true);
};
const onChange = (e: any) => {
  console.log(e);
  const value = e.target.value;
  setCurrentSpeaker({
    ...currentSpeaker,
    [e.target.name]: value
  });
}

  return (
    <div>
       
      <Dialog onClose={handleClose} open={isOpened}  >
      <CloseButton setClose={()=>setClose(false)} />
      <DialogContent > 
                 
        <FormControl>
        <Box minHeight={400} marginTop={5}  component="form" noValidate
      autoComplete="off">
        <Grid container spacing={1} rowSpacing={5}>
          <Grid  item xs={6}  > 
      <TextField
          id="speaker-name"
          label="Name"
          defaultValue={currentSpeaker.name}
          name='name'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event);
          }}
          InputProps={{
            readOnly: !isAdmin,
          }}
        />
         </Grid > 
         <Grid  item xs={6}  > 
      <TextField
          id="speaker-email"
          label="Email"
          defaultValue={currentSpeaker.email}
          name='email'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event);
          }}
          InputProps={{
            readOnly: !isAdmin,
          }}
        />
         </Grid >
        <Grid  item xs={6}  > 
              <TextField
          id="speaker-position"
          label="Position"
          defaultValue={currentSpeaker.position}
          name='position'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event);
          }}
          InputProps={{
            readOnly: !isAdmin,
          }}
        />
         </Grid > 
        <Grid  item xs={6}  > 
              <TextField
          id="speaker-company"
          label="Company"
          name='company'
          defaultValue={currentSpeaker.company}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event);
          }}
          InputProps={{
            readOnly: !isAdmin,
          }}
        />
         </Grid > 
        <Grid item xs={12}  > 
               <TextField
              fullWidth
              multiline
              name='bioInfo'
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
             </Grid > 
             </Grid > 
            </Box>
        </FormControl>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>

        {isAdmin && <Button onClick={UpdateSpeaker}  variant="contained">Save</Button> }
        {isAdmin  && !isInsert && <Button onClick={DeleteSpeaker} variant="contained">Delete</Button> }
        {/* TODO i da nije speaker */}
        {!isAdmin && <Button  variant="contained">Invite</Button> }
        </DialogActions>

      </Dialog>
     
    </div>
  );
}
