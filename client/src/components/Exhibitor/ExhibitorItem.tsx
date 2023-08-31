import {

  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
      <Box onClick={() => displayEventInfo(true)}  >
        <Card key={exhibitor.exhibitorId} sx={{ minWidth: 275 ,minHeight: 200}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {`Stand ${exhibitor.stand}: ${exhibitor.name}`}
          </Typography>
          <Typography variant="body2">{exhibitor.description}</Typography>
        </CardContent>
        <CardActions>
      
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
