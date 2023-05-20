import { Box, Card, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Tab, Tabs } from "@mui/material";
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

function SeminarTabs() {
    const [value, setValue] = useState('1');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    return (
      <Container >
        <Tabs value={value} onChange={handleChange}>
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
        </Tabs>
      </Container>
    );
}

export default function SeminarList() {
    return (
        <Card>
            <Grid container justifyContent={"center"}>
                <Paper elevation={3} >
                    <SeminarTabs/>
                    <List>
                        <SeminarListItem name="seminarcic" destination="boulevard of broken dreams" date={formatDate(new Date())}/>
                        <SeminarListItem name="seminarcic" destination="boulevard of broken dreams" date={formatDate(new Date())}/>
                    </List>
                </Paper>
            </Grid>
        </Card>
    );
}
