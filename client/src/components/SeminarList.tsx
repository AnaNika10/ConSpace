import { Box, Card, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

function SeminarListItem({name, date, destination}: {name : string, date : string, destination : string}) {
    const [isAddedToSchedule, setState] = useState(false);
    return (
        <ListItem alignItems="flex-start">
            <Stack spacing={5} direction={"row"}>
                <ListItemButton onClick={() => setState(!isAddedToSchedule)}>
                    <ListItemText primary={date + " " + name} secondary={destination}/>
                    <ListItemIcon sx={{display: 'flex', justifyContent:'flex-end'}}>
                        {isAddedToSchedule ? <TaskAltIcon/> : <AddIcon/>}
                    </ListItemIcon>
                </ListItemButton>   
            </Stack>
        </ListItem>
    );
}

function formatDate(date: Date) {
    return date.getHours().toString() + ":" + date.getMinutes().toString().padStart(2, '0');
}

export default function SeminarList() {
    return (
        <Card>
            <Grid container justifyContent={"center"}>
                <Paper elevation={3} >
                <List>
                    <SeminarListItem name="seminarcic" destination="boulevard of broken dreams" date={formatDate(new Date())}/>
                    <SeminarListItem name="seminarcic" destination="boulevard of broken dreams" date={formatDate(new Date())}/>
                </List>
                </Paper>
            </Grid>
        </Card>
    );
}
