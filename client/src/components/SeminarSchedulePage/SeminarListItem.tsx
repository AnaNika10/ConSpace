import {
  ListItem,
  Stack,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import { Seminar } from "../../models/Seminar";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddIcon from "@mui/icons-material/Add";
import { EventInformation } from "./EventInformation";
import { Appointment } from "../../models/Appointment";
import useAuth from "../../hooks/useAuth";

export function SeminarListItem({ seminar,userAppointements,isAdmin }: { seminar: Seminar,userAppointements : Appointment[],isAdmin:boolean }) {
  // console.error('userAppointements',userAppointements.map(x=>x.id));
  // console.error('Seminar seminarId',seminar.seminarId);
  const isInSchedule = () => {
   let checkSchedule = userAppointements.map(x=>x.id).includes(seminar.seminarId!);
   return checkSchedule;
  };
  const { auth } = useAuth();
  const [isAddedToSchedule, addSchedule] = useState(!isAdmin ? isInSchedule() : false);
 
  const [isAddedToSchedule1, addSchedule1] = useState(false); 

  const [infoIsDisplayed, displayEventInfo] = useState(false);
  const setOpen = (_isOpened: boolean) => {
    displayEventInfo(!infoIsDisplayed);
  };

  return (
    <ListItem alignItems="flex-start" key={seminar.seminarId}>
      <Stack spacing={2} direction={"row"}>
        <ListItemButton onClick={() => displayEventInfo(true)}>
          <ListItemText
            sx={{ width: 500 }}
            primary={
              DateFormatUtil.extractTime(seminar.startDateTime) +
              " " +
              seminar.name
            }
            secondary={"Hall: " + seminar.hall}
          />
          { !isAdmin && auth.accessToken &&
          <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
            {isAddedToSchedule ? <TaskAltIcon /> : <AddIcon />}
          </ListItemIcon>}
        </ListItemButton>
      </Stack>
      <EventInformation
        seminar={seminar}
        // date={DateFormatUtil.extractTime(seminar.startDateTime)}
        isOpened={infoIsDisplayed}
        setOpen={setOpen}
        isAdded={isAddedToSchedule}
        addSchedule={addSchedule}
        isAdmin={isAdmin}
      />
    </ListItem>
  );
}
