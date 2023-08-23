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

export function SeminarListItem({ seminar }: { seminar: Seminar }) {
  const [isAddedToSchedule, addSchedule] = useState(false);
  const updateSchedule = (isAdded: boolean) => {
    addSchedule(!isAdded);
  };
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
          <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
            {isAddedToSchedule ? <TaskAltIcon /> : <AddIcon />}
          </ListItemIcon>
        </ListItemButton>
      </Stack>
      <EventInformation
        name={seminar.name}
        date={DateFormatUtil.extractTime(seminar.startDateTime)}
        isOpened={infoIsDisplayed}
        setOpen={setOpen}
        destination={"Hall: " + seminar.hall}
        isAdded={isAddedToSchedule}
        updateSchedule={updateSchedule}
      />
    </ListItem>
  );
}
