import {

  Box,
  Button,
  Card,
  CardActions,
  CardContent,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography
  } from "@mui/material";
  import { useState } from "react";
  import { Exhibitor } from "../../models/Exhibitor";
import { ExhibitorForm } from "./ExhibitorForm";
    
  export function ExhibitorItem({
  exhibitor }
  : { 
    exhibitor: Exhibitor
})
  {
    const [infoIsDisplayed, displayEventInfo] = useState(false);
    const setOpen = (_isOpened: boolean) => {
      displayEventInfo(!infoIsDisplayed);
    };
    return (
      <>
      <Box onClick={() => displayEventInfo(true)} >
        <Card key={exhibitor.exhibitorId} sx={{ maxWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {`Stand ${exhibitor.stand}: ${exhibitor.name}`}
          </Typography>
          <Typography variant="body2">{exhibitor.description}</Typography>
        </CardContent>
        <CardActions>
          {/* <Stack direction={"row"} spacing={12}>
            <Button size="small" startIcon={<Edit />} onClick={handleEdit}>
              Edit
            </Button>
            <Button size="small" startIcon={<Delete />} onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
             </ListItem> */}
        </CardActions>
      </Card>
     </Box>
        { <ExhibitorForm
         
          isOpened={infoIsDisplayed}
          displayEventInfo = {setOpen}
          exhibitor={exhibitor}
        /> }
        </>
    
    );
  }
  
    // <ListItem alignItems="flex-start" key={exhibitor.exhibitorId}>
        // <Stack spacing={2} direction={"row"}>

        //   <ListItemButton >
        //      <ListItemText sx={{ width: 500 }} id={exhibitor.exhibitorId?.toString()} primary={exhibitor.name} />
        //     </ListItemButton>
        // </Stack>