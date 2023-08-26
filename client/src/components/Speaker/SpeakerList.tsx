import { AppBar, Grid, IconButton, List, Paper, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SpeakerDataProvider } from "../../dataProviders/SpeakerDataProvider";
import { Speaker } from "../../models/Speaker";
import { SpeakerItem } from "./SpeakerItem";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const AddButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <>
        <Toolbar>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            List of speakers
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Toolbar>
    </>
  );
};

export default function SeminarList() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const handleClose = () => {
   
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SpeakerDataProvider.fetchSeminarSchedule();
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
  }, []);


  return (
    <Grid
      container
      justifyContent="space-around"
      paddingTop={15}
      paddingBottom={15}
    >
      <Paper elevation={3}>
      <AddButton handleClose={handleClose} />
        <List>
          {!isLoading &&
            data.map((speaker: Speaker) => {
              return (
                <SpeakerItem speaker={speaker} key={speaker.speakerId} />
              );
            })}
        </List>
      </Paper>
    </Grid>
  );
}
