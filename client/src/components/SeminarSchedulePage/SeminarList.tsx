import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { SeminarDataProvider } from "../../dataProviders/SeminarDataProvider";
import { Seminar } from "../../models/Seminar";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Lecture information
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

function EventInformation({
  name,
  date,
  destination,
  isOpened,
  setOpen,
  isAdded,
  updateSchedule,
}: {
  name: string;
  date: string;
  destination: string;
  isOpened: boolean;
  setOpen: (a: boolean) => void;
  isAdded: boolean;
  updateSchedule: (a: boolean) => void;
}) {
  const handleClose = () => {
    setOpen(false);
    updateSchedule(isAdded);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={isOpened}>
        <CloseButton handleClose={handleClose} />
        <DialogTitle>{name}</DialogTitle>
        <DialogContent dividers>
          <Typography>{destination}</Typography>
          <Typography>Time: {date}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {isAdded ? "Remove from schedule" : "Add to schedule"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SeminarListItem({ seminar }: { seminar: Seminar }) {
  const [isAddedToSchedule, addSchedule] = useState(false);
  const updateSchedule = (isAdded: boolean) => {
    addSchedule(!isAdded);
  };
  const [infoIsDisplayed, displayEventInfo] = useState(false);
  const setOpen = (isOpened: boolean) => {
    displayEventInfo(!infoIsDisplayed);
  };

  return (
    <ListItem alignItems="flex-start" key={seminar.conferenceId}>
      <Stack spacing={2} direction={"row"}>
        <ListItemButton onClick={() => displayEventInfo(true)}>
          <ListItemText
            sx={{ width: 500 }}
            primary={formatDate(seminar.dateTime) + " " + seminar.name}
            secondary={"Floor: " + seminar.floor}
          />
          <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
            {isAddedToSchedule ? <TaskAltIcon /> : <AddIcon />}
          </ListItemIcon>
        </ListItemButton>
      </Stack>
      <EventInformation
        name={seminar.name}
        date={formatDate(seminar.dateTime)}
        isOpened={infoIsDisplayed}
        setOpen={setOpen}
        destination={"Floor: " + seminar.floor}
        isAdded={isAddedToSchedule}
        updateSchedule={updateSchedule}
      />
    </ListItem>
  );
}

function formatDate(date: string) {
  return dayjs(date).format("HH:mm");
}

function SeminarTabs({
  setDay,
  dayOfSeminar,
}: {
  setDay: (a: number) => void;
  dayOfSeminar: { day: number }[];
}) {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
    </Grid>
  );
}

export default function SeminarList() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [dayOfSeminar, setDay] = useState(1);
  const setDayOfSeminar = (day: number) => {
    setDay(day);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SeminarDataProvider.fetchSeminarSchedule();
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

  const seminarsByDay = () => {
    const dates = new Set(
      data.map((seminar: Seminar) => seminar.dateTime.substring(0, 10))
    );
    const sortedByDate = Array.from(dates)
      .sort()
      .map((it, i) => {
        return {
          date: it,
          day: i + 1,
          seminarsOfDay: data.filter(
            (seminar: Seminar) => seminar.dateTime.substring(0, 10) === it
          ),
        };
      });
    return sortedByDate;
  };
  const getSeminarsForSelectedDay = () => {
    return seminarsByDay()
      .filter((it) => {
        return it.day === dayOfSeminar;
      })
      .flatMap((it) => it.seminarsOfDay);
  };
  const getDays = () => {
    return seminarsByDay().map((it) => {
      return { day: it.day };
    });
  };

  return (
    <Grid
      container
      justifyContent="space-around"
      paddingTop={15}
      paddingBottom={15}
    >
      <Paper elevation={3}>
        <SeminarTabs setDay={setDayOfSeminar} dayOfSeminar={getDays()} />
        <List>
          {!isLoading &&
            getSeminarsForSelectedDay().map((seminar: Seminar) => {
              return (
                <SeminarListItem seminar={seminar} key={seminar.conferenceId} />
              );
            })}
        </List>
      </Paper>
    </Grid>
  );
}
