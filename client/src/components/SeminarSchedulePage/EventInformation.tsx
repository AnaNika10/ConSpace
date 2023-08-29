import {
  Dialog,
  DialogTitle,
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
  SelectChangeEvent,
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
import {
  DateTimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  GET_SEMINARS_URL,
  GET_SPEAKERS_URL,
  GET_EXHIBITORS_URL,
} from "../../constants/api";
import { Exhibitor } from "../../models/Exhibitor";
import { Speaker } from "../../models/Speaker";

const CloseButton = ({ setClose }: { setClose: () => void }) => {
  return (
    <>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={setClose}>
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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
  const isInsert =
    seminar.seminarId === null || seminar.seminarId === undefined;
  const onChange = (e: any) => {
    console.log(e);
    const value = e.target.value;
    if (e.target.name === "duration") {
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
    setCurrentSeminar({
      ...currentSeminar,
      [e.target.name]: value,
    });
  };

  const handleChangeDateTime = (value: Dayjs | null) => {
    const x = dayjs(value).format("YYYY-MM-DDTHH:mm:ss");
    setCurrentSeminar({
      ...currentSeminar,
      startDateTime: x,
    });
  };

  const getFromExhibitorId = (id: number) => {
    const x = allExhibitors.find((x) => x.exhibitorId === id);
    return x;
  };
  const setClose = (isSaved: boolean) => {
    setOpen(false);
    if (!isSaved) {
      setCurrentSeminar(original);
    }
  };
  const onAutocompleteChange = (event: any, values: any) => {
    console.log(event);
    console.log(values);
    console.log("aa");
  };
  const DeleteSeminar = async () => {
    console.log("clicked" + currentSeminar.seminarId);
    const data = currentSeminar.seminarId!;
    // SpeakerDataProvider.DeleteSpeaker(data,auth.accessToken);
    await axiosPrivate.delete(
      `${GET_SEMINARS_URL}/${currentSeminar.seminarId}`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    setClose(true);
  };
  const SaveSeminar = async () => {
    if (!currentSeminar.seminarId) {
      // SpeakerDataProvider.InsertSpeaker(currentSeminar, auth.accessToken);
      const response = await axiosPrivate.post(
        `${GET_SEMINARS_URL}`,
        JSON.stringify(currentSeminar),
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      //SpeakerDataProvider.UpdateSpeaker(currentSeminar, auth.accessToken);
      const response = await axiosPrivate.put(
        `${GET_SEMINARS_URL}`,
        JSON.stringify(currentSeminar),
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    setClose(true);
  };
  const handleClose = (event: object, reason: string) => {
    if (reason && reason == "backdropClick") return;
    // TODO  updateSchedule(isAdded);
  };
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllSpeakers = async () => {
      try {
        const response = await axiosPrivate.get(GET_SPEAKERS_URL, {
          signal: controller.signal,
        });

        isMounted && setLoading(false);
        isMounted && setError(null);
        isMounted && setAllSpeakers(response.data);
      } catch (err: any) {
        isMounted && setError(err.message);
        isMounted && setAllSpeakers([]);
        navigate("/sign-in", { state: { from: location }, replace: true });
      } finally {
        isMounted && setLoading(false);
      }
    };
    const getAllExhibitors = async () => {
      try {
        const response = await axiosPrivate.get(GET_EXHIBITORS_URL, {
          signal: controller.signal,
        });

        isMounted && setLoading(false);
        isMounted && setError(null);
        isMounted && setAllExhibitors(response.data);
      } catch (err: any) {
        isMounted && setError(err.message);
        isMounted && setAllExhibitors([]);
        navigate("/sign-in", { state: { from: location }, replace: true });
      } finally {
        isMounted && setLoading(false);
      }
    };
    getAllSpeakers();
    getAllExhibitors();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/seminar-schedule")) {
        controller.abort();
      }
    };
  }, [location.pathname, allSpeakers, auth]);

  return (
    // <div>
    //   <Dialog onClose={handleClose} open={isOpened}>
    //     <CloseButton handleClose={handleClose} />
    //     <DialogTitle>{seminar.name}</DialogTitle>
    //     <DialogContent dividers>
    //       <Typography>{"Hall: " + seminar.hall}</Typography>
    //       <Typography>Time: { DateFormatUtil.extractTime(seminar.startDateTime)}</Typography>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button autoFocus onClick={handleClose}>
    //         {isAdded ? "Remove from schedule" : "Add to schedule"}
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </div>

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
            <FormControl fullWidth>
              <Grid container spacing={1} rowSpacing={5}>
                <Grid item xs={6}>
                  <TextField
                    id="seminar-name"
                    label="Name"
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
                <Grid item xs={6}>
                  <TextField
                    id="seminar-hall"
                    label="Hall"
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
                    id="speakers-filled"
                    options={allSpeakers.map((option) => option.name)}
                    value={currentSeminar.speakerNames}
                    autoSelect
                    onChange={onAutocompleteChange}
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="freeSolo"
                        placeholder="Favorites"
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
                        variant="filled"
                        label="Exhibitors"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="seminar-hall"
                    label="Hall"
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
              </Grid>

              <Grid container spacing={1} rowSpacing={5} marginTop={1}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Start time"
                      value={dayjs(currentSeminar.startDateTime)}
                      onChange={handleChangeDateTime}
                      readOnly={!isAdmin}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="seminar-duration"
                    label="Duration (minutes)"
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
