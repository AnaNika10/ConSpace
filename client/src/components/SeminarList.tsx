import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

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

function formatDate(date: Date) {
    return date.getHours().toString() + ":" + date.getMinutes().toString().padStart(2, '0');
}

function SeminarTabs() {
    const [value, setValue] = useState('1');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    return (
        <Grid container justifyContent={"center"} >
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Day 1" value="1" />
                <Tab label="Day 2" value="2" />
            </Tabs>
        </Grid>
    );
}

export default function SeminarList() {
    return (
        <Grid container justifyContent="space-around" paddingTop={5} paddingBottom={5}>
            <Paper elevation={3} >
                <SeminarTabs/>
                <List>
                    <SeminarListItem name="seminarcic" destination="boulevard of broken dreams" date={formatDate(new Date())}/>
                    <SeminarListItem name="seminarcic" destination="boulevard of broken dreams" date={formatDate(new Date())}/>
                </List>
            </Paper>
        </Grid>
    );
}