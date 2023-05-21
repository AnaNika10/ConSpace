import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import TodayIcon from '@mui/icons-material/Today';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import MicIcon from '@mui/icons-material/Mic';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 260;

export default function MenuDrawer() {
    const [open, setOpen] = useState(false);
  
    const toggleDrawer =
      (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
  
        setOpen(!open);
      };
  
    const list = (
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{ overflow: 'auto' }}
        paddingTop={5}
      >
        <List>
          {[{section:'Notification', icon: <NotificationsIcon/>}, 
            {section:'My Seminar Schedule', icon: <TodayIcon/>}, 
            {section:'Notes', icon:<StickyNote2Icon/>}, 
            {section:'Speakers', icon: <MicIcon/>}].map(({section, icon}) => (
            <ListItem key={section}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
              <ListItemButton>
                <ListItemText primary={section} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    return (
        <Drawer
            anchor="left"
            variant="permanent"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
              }}
        >
          <IconButton onClick={toggleDrawer(open)}>
            <ChevronRightIcon/>
          </IconButton>
          <Divider/>
            {list}
        </Drawer>
    );
  }