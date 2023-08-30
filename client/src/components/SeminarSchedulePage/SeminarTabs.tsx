import { Add } from "@mui/icons-material";
import { Grid, Tabs, Tab, Fab } from "@mui/material";
import { useState } from "react";
import { EventInformation } from "./EventInformation";
import { Seminar } from "../../models/Seminar";
const emptySeminar : Seminar = {

  seminarId : "",
  name : "",
  hall: "",
  speakers: [],
  speakerNames: [],
  exhibitors: 0,
  description: "",
  startDateTime: "",
  endDateTime: ""

}
const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
export function SeminarTabs({
  setDay,
  dayOfSeminar,
}: {
  setDay: (a: number) => void;
  dayOfSeminar: { day: number }[];
}) {
  const [value, setValue] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setDay(newValue);
  };
  return (
    <Grid container justifyContent={"center"}>
      <Tabs key={value} value={value} onChange={handleChange}>
        {dayOfSeminar.length > 0 &&
          dayOfSeminar.map((it) => {
            return <Tab key={it.day} label={"Day " + it.day} value={it.day} />;
          })}
      </Tabs>
      <Fab sx={fabStyle} color="primary" aria-label="add">
        <Add onClick={handleOpen} />
      </Fab>
      <EventInformation
        seminar={emptySeminar}
        isOpened={open}
        setOpen={setOpen}
        isAdded={false}
        updateSchedule={()=>void 0}
      />
    </Grid>
    
  );
}
