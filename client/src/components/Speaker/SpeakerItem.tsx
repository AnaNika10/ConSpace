import {
    Avatar,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    TextField
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { Speaker } from "../../models/Speaker";
import { SpeakerForm } from "./SpeakerForm";

    const initialValues = {

    id: 0,
    fullname:'',
    bioinfo:'',
    company:'',
    title:''

    }
    function stringToColor(string: string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
    function stringAvatar(name: string) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
  export function SpeakerItem({ speaker }: { speaker: Speaker }) {
    const [values,setValues] = useState(initialValues);
    const [infoIsDisplayed, displayEventInfo] = useState(false);

    return (
        <ListItem alignItems="flex-start" key={speaker.speakerId}>
        <Stack spacing={2} direction={"row"}>

          <ListItemButton onClick={() => displayEventInfo(true)}>
              <ListItemAvatar>
              <Avatar {...stringAvatar(speaker.name)} />
              </ListItemAvatar>
              <ListItemText sx={{ width: 500 }} id={speaker.speakerId?.toString()} primary={speaker.name + ' : ' + speaker.position} />
            </ListItemButton>
        </Stack>
        { <SpeakerForm
         
          isOpened={infoIsDisplayed}
          displayEventInfo = {displayEventInfo}
          speaker={speaker}

        /> }
      </ListItem>

//     <form>
// <Grid container>
// <Grid item xs={6}>

//     <TextField>

//         varient="outlined"
//         label = "Name"
//         name = "fullname"
//         value={values.fullname}
//     </TextField>

    
//     <TextField>

//         varient="outlined"
//         label = "Job title"
//         name = "title"
//         value={values.title}
//     </TextField>

    
//     <TextField>

//         varient="outlined"
//         label = "Company"
//         name = "company"
//         value={values.company}
//     </TextField>

    
//     <TextField>

//         varient="outlined"
//         label = "About speaker"
//         name = "bioinfo"
//         value={values.bioinfo}
//     </TextField>
// </Grid>
// <Grid item xs={6}>

// </Grid>
    
// </Grid>

//     </form>
    );
  }
  