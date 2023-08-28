import { AppBar, Fab, Grid, IconButton, List, Paper, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SpeakerDataProvider } from "../../dataProviders/SpeakerDataProvider";
import { Speaker } from "../../models/Speaker";
import { SpeakerItem } from "./SpeakerItem";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import useAuth from "../../hooks/useAuth";
import { SpeakerForm } from "./SpeakerForm";
import { Add } from "@mui/icons-material";
import jwtDecode from "jwt-decode";

const emptySpeaker : Speaker = {
  name: "",
  position: "",
  company: "",
  bioInfo : "",
  email : ""
}
const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
const AddButton = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
        <Toolbar>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            List of speakers
          </Typography>
          <IconButton edge="end" color="inherit" onClick={() => setOpenForm(true)}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
          { <SpeakerForm
         
         isOpened={openForm}
         displayEventInfo={() => setOpenForm(false)}
         speaker={emptySpeaker}

       /> }
        </Toolbar>
    </>
  );
};

export default function SeminarList() {
  const { auth } = useAuth();
  const decoded :any = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const [data, setData] = useState<Speaker[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const handleOpen = () => setOpenForm(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SpeakerDataProvider.fetchSpeakers(auth.accessToken);
        if (!response.ok) {
          throw new Error("Failed fetching data");
        }
        const actual = await response.json();
        setLoading(false);
        setError(null);
        setData(actual);
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth,data]);


  return (
    <Grid
      container
      justifyContent="space-around"
      paddingTop={15}
      paddingBottom={15}
    >
      <Paper elevation={3}>
      { isAdmin  && <AddButton /> }
        <List>
          {!isLoading &&
            data.map((speaker: Speaker) => {
              return (
                <SpeakerItem speaker={speaker}  key={speaker.speakerId} />
              );
            })}
        </List>
      { isAdmin &&  <Fab sx={fabStyle} color="primary" aria-label="add">
        <Add onClick={handleOpen} />
      </Fab> }
      { isAdmin && <SpeakerForm
         
         isOpened={openForm}
         displayEventInfo={() => setOpenForm(false)}
         speaker={emptySpeaker}

       /> }
      </Paper>

    </Grid>
    
  );
}
