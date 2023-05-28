import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { SeminarDataProvider } from "../dataProviders/SeminarDataProvider";
import { Seminar } from "../models/Seminar";

const CloseButton = ({handleClose}: {handleClose: ()=> void}) => {
    return <>
    <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Lecture information
            </Typography>
        </Toolbar>
    </AppBar>
    </>
}

function EventInformation({name, date, destination, isOpened, setOpen, isAdded, updateSchedule}: {name : string, date : string, destination : string, 
    isOpened: boolean, setOpen: (a: boolean) => void, isAdded: boolean, updateSchedule: (a : boolean) => void}) {
    const handleClose = () => { setOpen(false); updateSchedule(isAdded)};
      
    return (
    <div>
        <Dialog onClose={handleClose} open={isOpened}>
        <CloseButton handleClose={handleClose}/>
        <DialogTitle>
            {name}
        </DialogTitle>
        <DialogContent dividers>
            <Typography>
                Location: {destination}
            </Typography>
            <Typography>
                {date}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
            {isAdded ? "Remove from schedule":"Add to schedule"}
            </Button>
        </DialogActions>
        </Dialog>
    </div>
    );
}

function SeminarListItem({name, date, destination}: {name : string, date : string, destination : string}) {
    const [isAddedToSchedule, addSchedule] = useState(false);
    const updateSchedule = (isAdded: boolean) => { addSchedule(!isAdded)}
    const [infoIsDisplayed, displayEventInfo] = useState(false);
    const setOpen = (isOpened: boolean) => { displayEventInfo(!infoIsDisplayed)}

    return (
        <ListItem alignItems="flex-start">
            <Stack spacing={2} direction={"row"}>
                <ListItemButton onClick={() => displayEventInfo(true)}>
                    <ListItemText primary={date + " " + name} secondary={destination}/>
                    <ListItemIcon sx={{display: 'flex', justifyContent:'flex-end'}}>
                        {isAddedToSchedule ? <TaskAltIcon/> : <AddIcon/>}
                    </ListItemIcon>
                </ListItemButton>   
            </Stack>
            <EventInformation name={name} date= {date} isOpened={infoIsDisplayed} setOpen={setOpen} destination={destination} isAdded={isAddedToSchedule} updateSchedule={updateSchedule}/>
        </ListItem>
    );
}

function formatDate(date: string) {
    return date.substring(11, 16);
}

function SeminarTabs({size}: {size:number}) {
    const [value, setValue] = useState('1');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    
    return (
        <Grid container justifyContent={"center"} >
            <Tabs value={value} onChange={handleChange} >
                {size > 0 && Array.from({length: size}, (_, i) => i + 1).map((day) => {
                    return <Tab key={day} label={"Day " + day} value={day}/>
                })}
            </Tabs>
        </Grid>
    );
}

export default function SeminarList() {
    const [data , setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => { 
        try{
            const response =  await SeminarDataProvider.fetchSeminarSchedule();
            if(!response.ok) {
                throw new Error("Failed fetching data");
            }
            const actual = await response.json();
            setLoading(false);
            setError(null);
            setData(actual)
        }catch(err: any) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    }  
        fetchData();
    }, []);

    const durationOfConference = new Set(data.map((seminar: Seminar) => new Date(seminar.dateTime.substring(0, 10)))).size;
    
    return (
        <Grid container justifyContent="space-around" paddingTop={15} paddingBottom={15}>
            <Paper elevation={3} >
                <SeminarTabs size={durationOfConference}/>
                <List>
                    {data.length > 0  && data.map((seminar: Seminar) => {
                        return <SeminarListItem name={seminar.name} destination={"Floor: " + seminar.floor} date={formatDate(seminar.dateTime)}/>
                })}
                </List>
            </Paper>
        </Grid>
    );
}