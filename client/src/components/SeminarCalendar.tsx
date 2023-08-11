import {
  Divider,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
  WeekView,
  ViewSwitcher,
  Toolbar,
  TodayButton,
  DateNavigator,
  ConfirmationDialog,
  CurrentTimeIndicator,
  Resources,
  GroupingPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  IntegratedGrouping,
  GroupingState,
} from "@devexpress/dx-react-scheduler";
import { useEffect, useMemo, useState } from "react";
import { UserDataProvider } from "../dataProviders/UserDataProvider";
import useAuth from "../hooks/useAuth";
import { MicOutlined, Room } from "@mui/icons-material";
import { Appointment } from "../models/Appointment";

const AppointmentContent = ({
  appointmentData,
  ...restProps
}: {
  appointmentData: Appointment;
  restProps: any[];
}) => {
  return (
    <>
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid
          container
          direction="column"
          alignItems="left"
          paddingLeft={2.5}
          spacing={5}
        >
          <Grid item xs={20}>
            <Stack direction={"row"} spacing={2.5} paddingY={1}>
              <MicOutlined />
              <span>{appointmentData.speakers}</span>
            </Stack>
            <Stack direction={"row"} spacing={2.5} paddingY={1}>
              <Room />
              <span>{appointmentData.location}</span>
            </Stack>
            <Divider />
            <Link paddingLeft={5} color="primary">
              "http://path-to-seminar-schedule-page"
            </Link>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
      ;;
    </>
  );
};

type ReduceReturnType = {
  speakers: string[];
  speakerIds: string[];
};

function getSpeakers(data: Appointment[]) {
  const dict: { [id: string]: string } = {};
  const speakersWithIds = data
    .map((it: Appointment) => {
      return { speakers: it.speakers, speakerIds: it.speakerIds };
    })
    .reduce<ReduceReturnType>(
      (acc, curr) => {
        return {
          speakers: acc.speakers.concat(curr.speakers),
          speakerIds: acc.speakerIds.concat(curr.speakerIds),
        };
      },
      { speakers: [], speakerIds: [] }
    );

  speakersWithIds.speakerIds.forEach((id, index) => {
    if (dict[id] === undefined) {
      dict[id] = speakersWithIds.speakers[index];
    }
  });
  const result = [];
  for (const key in dict) {
    result.push({ text: dict[key], id: key });
  }
  return [...new Set(result)];
}

function mapResources(data: Appointment[]) {
  return [
    {
      id: 0,
      fieldName: "conferenceRoomId",
      instances: [
        ...new Set(
          data.map((it: Appointment) => {
            return { text: it.location, id: it.conferenceRoomId };
          })
        ),
      ],
      title: "Location",
    },
    {
      id: 1,
      fieldName: "speakerIds",
      instances: getSpeakers(data),
      allowMultiple: true,
      title: "Speakers",
    },
  ];
}
const mainGroupingBy = {
  byLocation: [
    { resourceName: "conferenceRoomId" },
    { resourceName: "speakerIds" },
  ],
  bySpeakers: [
    { resourceName: "speakerIds" },
    { resourceName: "conferenceRoomId" },
  ],
};

function SelectGrouping({
  groupName,
  setGroupName,
  setGrouping,
  setMain,
}: {
  groupName: string;
  setGroupName: (a: string) => void;
  setGrouping: (a: { resourceName: string }[]) => void;
  setMain: (a: boolean) => void;
}) {
  const groupings = [
    { value: "Speakers", resourceName: "speakerIds" },
    { value: "Location", resourceName: "conferenceRoomId" },
    { value: "Location and Speakers", resourceName: "conferenceRoomId" },
  ];
  const handleChange = (event: SelectChangeEvent) => {
    const selected = groupings.find((it) => it.value === event.target.value);
    setGroupName(selected === undefined ? "" : selected.value);
    let grouping: { resourceName: string }[];
    switch (selected?.value) {
      case "Speakers":
        grouping = [{ resourceName: "speakerIds" }];
        break;
      case "Location":
        grouping = [{ resourceName: "conferenceRoomId" }];
        break;
      case "Location and Speakers":
        setMain(true);
        grouping = mainGroupingBy.byLocation;
        break;
      default:
        grouping = [];
        break;
    }
    setGrouping(grouping);
  };
  return (
    <>
      <InputLabel>Group by</InputLabel>
      <Select value={groupName} onChange={handleChange} displayEmpty>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"Location"}>Location</MenuItem>
        <MenuItem value={"Speakers"}>Speakers</MenuItem>
        <MenuItem value={"Location and Speakers"}>
          Location and Speakers
        </MenuItem>
      </Select>
    </>
  );
}
export default function SeminarCalendar() {
  const [data, setData] = useState<Appointment[]>([]);

  const resources = useMemo(() => mapResources(data), [data]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const { auth } = useAuth();
  const [currentViewName, currentViewNameChange] = useState("Week");
  const setCalendarView = (name: string) => {
    currentViewNameChange(name);
  };
  const [grouping, setGrouping] = useState<{ resourceName: string }[]>([]);
  const [groupName, setGroupName] = useState("");
  const [mainGroup, setMain] = useState("Location");
  const [isBoth, setBoth] = useState(false);
  const currentDate = new Date().toISOString().substring(0, 10);
  const selectGroupName = (name: string) => setGroupName(name);
  const selectGrouping = (group: { resourceName: string }[]) =>
    setGrouping(group);
  const selectedBoth = (both: boolean) => setBoth(both);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserDataProvider.fetchUserSchedule(
          auth.accessToken
        );
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
  }, [auth, data]);

  const commitChanges = ({ deleted }: { deleted: string }) => {
    setData((state: Appointment[]) => {
      if (deleted !== undefined) {
        UserDataProvider.deleteSeminarFromSchedule(deleted, auth.accessToken);
        state = state.filter(
          (appointment: Appointment) => appointment.id !== deleted
        );
      }
      return state;
    });
  };

  const handleGrouping = (event: SelectChangeEvent) => {
    if (event.target.value === "Location" || event.target.value === undefined) {
      setGrouping(mainGroupingBy.byLocation);
    } else {
      setGrouping(mainGroupingBy.bySpeakers);
    }
    setMain(event.target.value === undefined ? "Location" : event.target.value);
  };

  return (
    <Paper>
      <Grid
        justifyContent="space-around"
        alignItems="center"
        padding={10}
        paddingLeft={15}
      >
        <>
          <SelectGrouping
            groupName={groupName}
            setGroupName={selectGroupName}
            setGrouping={selectGrouping}
            setMain={selectedBoth}
          />
          {!isBoth || grouping.length !== 2 ? null : (
            <>
              <InputLabel>Switch</InputLabel>
              <Select value={mainGroup} onChange={handleGrouping}>
                <MenuItem value={"Location"}>Location</MenuItem>
                <MenuItem value={"Speakers"}>Speakers</MenuItem>
              </Select>
            </>
          )}
        </>

        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCalendarView}
          />
          <EditingState onCommitChanges={commitChanges} />
          {isLoading ? null : <GroupingState grouping={grouping} />}
          <DayView startDayHour={10} endDayHour={20} />
          <WeekView startDayHour={10} endDayHour={20} />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          {grouping.length === 0 ? null : (
            <Resources
              data={resources}
              mainResourceName={grouping[0].resourceName}
            />
          )}
          <IntegratedEditing />
          {isLoading || grouping.length === 0 ? null : <IntegratedGrouping />}
          <AppointmentTooltip
            contentComponent={AppointmentContent}
            showCloseButton
            showDeleteButton
          />
          <CurrentTimeIndicator
            shadePreviousCells={true}
            shadePreviousAppointments={true}
          />
          <ConfirmationDialog />
          {isLoading || grouping.length === 0 ? null : <GroupingPanel />}
        </Scheduler>
      </Grid>
    </Paper>
  );
}
