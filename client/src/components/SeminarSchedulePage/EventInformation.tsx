import {
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Box,
  FormControl,
  Grid,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Seminar } from "../../models/Seminar";

import { ConferenceDateUtil } from "./ConferenceDateUtil";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { Exhibitor } from "../../models/Exhibitor";
import { Speaker } from "../../models/Speaker";

import { SeminarDataProvider } from "../../dataProviders/SeminarDataProvider";
import { Appointment } from "../../models/Appointment";

const CloseButton = ({ setClose }: { setClose: () => void }) => {
  return (
    <>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Lecture information
          </Typography>
          <IconButton edge="end" color="inherit" onClick={setClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export function EventInformation({
  seminar,
  isOpened,
  setOpen,
  isAdded,
  updateSchedule,
}: {
  seminar: Seminar;
  isOpened: boolean;
  setOpen: (a: boolean) => void;
  isAdded: boolean;
  updateSchedule: (a: boolean) => void;
}) {
  const { auth } = useAuth();
  const original: Seminar = JSON.parse(
    JSON.stringify(seminar)
  ) as typeof seminar;
  const [currentSeminar, setCurrentSeminar] = useState(original);

  const [allSpeakers, setAllSpeakers] = useState<Speaker[]>([]);
  const [allExhibitors, setAllExhibitors] = useState<Exhibitor[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const decoded: any = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const isSpeaker = role === "Speaker";
  const isInsert =
    seminar.seminarId === null || seminar.seminarId === undefined;
  const onChange = (e: any) => {
    console.log(e);
    const value = e.target.value;
    if (e.target.name === "duration") {
      // if (value === '' || value < 0)
      // {
      //   setErrorValidation({
      //     ...errorValidation,
      //     duration: true
      //   });
      //   return;
      // }
      // else
      // {
      //   setErrorValidation({
      //     ...errorValidation,
      //     duration: false
      //   });
      // }
      const newEnd = ConferenceDateUtil.calculateEndDateTime(
        currentSeminar.startDateTime,
        e.target.value
      );
      setCurrentSeminar({
        ...currentSeminar,
        endDateTime: newEnd,
      });
      return;
    }
    // if (value === '')
    // {
    //   setErrorValidation({
    //     ...errorValidation,
    //     [e.target.name]: true
    //   });
    //   return;
    // }
    // else
    // {
    //   setErrorValidation({
    //     ...errorValidation,
    //     [e.target.name]: false
    //   });
    // }
    setCurrentSeminar({
      ...currentSeminar,
      [e.target.name]: value,
    });
  };

  const handleChangeDateTime = (value: Dayjs | null) => {
    // if (value === null)
    // {
    //   setErrorValidation({
    //     ...errorValidation,
    //     startDateTime: true
    //   });
    //   return;
    // }
    // else
    // {
    //   setErrorValidation({
    //     ...errorValidation,
    //     startDateTime: false
    //   });
    // }
    const x = dayjs(value).format("YYYY-MM-DDTHH:mm:ss");
    let currentTime = ConferenceDateUtil.calculateDuration(
      currentSeminar.startDateTime,
      currentSeminar.endDateTime
    );
    const newEnd = ConferenceDateUtil.calculateEndDateTime(x, currentTime);
    setCurrentSeminar({
      ...currentSeminar,
      startDateTime: x,
      endDateTime: newEnd,
    });
  };

  const getFromExhibitorId = (id: number) => {
    const x = allExhibitors.find((x) => x.exhibitorId === id);
    return x;
  };
  const getFromSpekaersId = (ids: number[]) => {
    const result = allSpeakers.filter((x) => ids.indexOf(x.speakerId!) > -1);
    return result;
  };
  const setClose = (isSaved: boolean) => {
    setOpen(false);
    if (!isSaved) {
      setCurrentSeminar(original);
    }
  };
  const updateUserSchedule = () => {
    updateSchedule(isAdded);
    if (isAdded) {
      deleteAppointment(currentSeminar.seminarId!);
    } else {
      insertAppointment(currentSeminar);
    }

    setClose(true);
  };
  async function deleteAppointment(deleted: string) {
    if (deleted !== undefined) {
      SeminarDataProvider.deleteAppointment(deleted, auth.accessToken);
    }
  }
  async function insertAppointment(seminar: Seminar) {
    let appointment: Appointment = {
      id: seminar.seminarId!,
      speakers: seminar.speakerNames,
      speakerIds: seminar.speakers,
      title: seminar.name,
      startDate: seminar.startDateTime,
      endDate: seminar.endDateTime,
      location: seminar.hall,
    };
    SeminarDataProvider.insertAppointment(appointment, auth.accessToken);
  }
  const onAutocompleteChange = (event: any, values: any) => {
    if (values === null) {
      setCurrentSeminar({
        ...currentSeminar,
        exhibitors: 0,
      });
    } else if ("exhibitorId" in values) {
      setCurrentSeminar({
        ...currentSeminar,
        exhibitors: values.exhibitorId,
      });
    } else if (Array.isArray(values)) {
      let x = values.map((x) => x.speakerId!);
      setCurrentSeminar({
        ...currentSeminar,
        speakers: x,
      });
    }
  };
  const DeleteSeminar = async () => {
    console.log("clicked" + currentSeminar.seminarId);

    SeminarDataProvider.deleteSeminar(
      currentSeminar.seminarId!,
      auth.accessToken
    );
    setClose(true);
  };
  const SaveSeminar = async () => {
    if (
      currentSeminar.speakers.length > 0 &&
      currentSeminar.exhibitors != 0 &&
      currentSeminar.name &&
      currentSeminar.hall &&
      currentSeminar.startDateTime &&
      currentSeminar.endDateTime
    ) {
      if (!currentSeminar.seminarId) {
        SeminarDataProvider.insertSeminar(currentSeminar, auth.accessToken);
        setClose(false);
      } else {
        SeminarDataProvider.updateSeminar(currentSeminar, auth.accessToken);
        setClose(true);
      }
    }
  };
  const handleClose = (event: object, reason: string) => {
    if (reason && reason == "backdropClick") return;
  };
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAllExhibitors = async () => {
      try {
        const response = await SeminarDataProvider.fetchAllExhibitors();

        setLoading(false);
        setError(null);
        setAllExhibitors(response?.data);
      } catch (err: any) {
        setError(err.message);
        setAllExhibitors([]);
      } finally {
        setLoading(false);
      }
    };

    const getAllSpeakers = async () => {
      try {
        const response = await SeminarDataProvider.fetchAllSpeakers();

        setLoading(false);
        setError(null);
        setAllSpeakers(response?.data);
      } catch (err: any) {
        setError(err.message);
        setAllSpeakers([]);
      } finally {
        setLoading(false);
      }
    };

    getAllExhibitors();
    getAllSpeakers();
  }, [location.pathname, allSpeakers, allExhibitors]);

  return (
    <div>
      <Dialog onClose={handleClose} open={isOpened}>
        <CloseButton setClose={() => setClose(false)} />
        <DialogContent>
          <Box
            minHeight={1000}
            marginTop={5}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl>
              <Grid container rowSpacing={5}>
                <Grid item xs={12}>
                  <TextField
                    id="seminar-name"
                    label="Name"
                    fullWidth
                    required
                    defaultValue={seminar.name}
                    name="name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="seminar-hall"
                    fullWidth
                    label="Hall"
                    required
                    defaultValue={currentSeminar.hall}
                    name="hall"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="speakers"
                    readOnly={!isAdmin}
                    options={allSpeakers}
                    defaultValue={
                      getFromSpekaersId(currentSeminar.speakers) as Speaker[]
                    }
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.name
                    }
                    autoSelect
                    isOptionEqualToValue={(option, value) =>
                      option.speakerId === value.speakerId
                    }
                    onChange={onAutocompleteChange}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.name}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Speakers"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="exhibitors"
                    options={allExhibitors}
                    defaultValue={
                      getFromExhibitorId(currentSeminar.exhibitors) as Exhibitor
                    }
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.name
                    }
                    autoSelect
                    isOptionEqualToValue={(option, value) =>
                      option.exhibitorId === value.exhibitorId
                    }
                    readOnly={!isAdmin}
                    onChange={onAutocompleteChange}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.name}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Exhibitors"
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} rowSpacing={5} marginTop={1}>
                <Grid item xs={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      ampm={false}
                      label="Date and time of the seminar"
                      hideTabs={false}
                      
                      ampmInClock={false}
                      value={currentSeminar.startDateTime !== "" ? dayjs(currentSeminar.startDateTime) : null}
                      onChange={handleChangeDateTime}
                      renderInput={(props) => (
                        <TextField {...props} fullWidth required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="seminar-duration"
                    label="Duration (minutes)"
                    required
                    defaultValue={ConferenceDateUtil.calculateDuration(
                      currentSeminar.startDateTime,
                      currentSeminar.endDateTime
                    )}
                    name="duration"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    name="description"
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                    defaultValue={currentSeminar.description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    label="Seminar description"
                    rows="6"
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          {isAdmin && (
            <Button onClick={SaveSeminar} variant="contained">
              Save
            </Button>
          )}
          {isAdmin && !isInsert && (
            <Button onClick={DeleteSeminar} variant="contained">
              Delete
            </Button>
          )}

          {!isAdmin && !isSpeaker && auth.accessToken && (
            <Button onClick={updateUserSchedule} variant="contained">
              {isAdded ? "Remove from schedule" : "Add to schedule"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
