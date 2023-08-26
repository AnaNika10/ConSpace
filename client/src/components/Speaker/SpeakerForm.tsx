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
  setClose
}: {
  speaker : Speaker
  isOpened: boolean;
  setClose: (a: boolean) => void;
}) {
  const handleClose = (event : object, reason : string) => {
    if (reason && reason == "backdropClick") 
        return;
    console.log("")
    setClose(false);
}

  return (
    <div>
       
      <Dialog onClose={handleClose} open={isOpened}  >
      <CloseButton setClose={ ()=>setClose(false)} />
      <DialogContent > 
                 
        <FormControl>
        <Box minHeight={400} marginTop={5}>
        <Grid container spacing={1} rowSpacing={5}>
          <Grid  item xs={4}  > 
      <TextField
          id="speaker-name"
          label="Name"
          value={speaker.name}
          InputProps={{
            readOnly: true,
          }}
        />
         </Grid > 
        <Grid  item xs={4}  > 
              <TextField
          id="speaker-position"
          label="Position"
          value={speaker.position}
          InputProps={{
            readOnly: true,
          }}
        />
         </Grid > 
        <Grid  item xs={4}  > 
              <TextField
          id="speaker-company"
          label="Company"
          value={speaker.company}
          InputProps={{
            readOnly: true,
          }}
        />
         </Grid > 
        <Grid item xs={12}  > 
               <TextField
              fullWidth
              multiline
              value={speaker.bioInfo}
              label="About speaker"
              rows="8"
            />
             </Grid > 
             </Grid > 
            </Box>
        </FormControl>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button  variant="contained">Delete</Button>
          <Button  variant="contained">Save</Button>
        </DialogActions>

      </Dialog>
     
    </div>
  );
}
