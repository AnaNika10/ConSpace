import { Grid, Paper } from "@mui/material";
import {
  Scheduler,
  AppointmentTooltip,
  ConfirmationDialog,
  CurrentTimeIndicator,
  Resources,
  GroupingPanel,
  DayView,
  Appointments,
  WeekView,
  ViewSwitcher,
  Toolbar,
  TodayButton,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
} from "@devexpress/dx-react-scheduler";
import { useEffect, useMemo, useState } from "react";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";
import useAuth from "../../hooks/useAuth";
import { Appointment } from "../../models/Appointment";
import GroupByScheduleSection from "./GroupScheduleBySection";
import { ResourceUtil } from "./ResourcesUtil";
import { AppointmentContent } from "./AppointmentContent";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import withSnackbar from "../Common/SnackBarWrapper";

function deleteAppointment(
  appointments: Appointment[],
  deleted: string,
  token: string
) {
  if (deleted !== undefined) {
    UserDataProvider.deleteSeminarFromSchedule(deleted, token);
    appointments = appointments.filter(
      (appointment: Appointment) => appointment.id !== deleted
    );
  }
  return appointments;
}

function SeminarCalendar() {
  const [data, setData] = useState<Appointment[]>([]);
  const resources = useMemo(() => ResourceUtil.mapResources(data), [data]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const [grouping, setGrouping] = useState<{ resourceName: string }[]>([]);
  const [isBoth, setBoth] = useState(false);
  const [isGroupedByDate, setGroupByDate] = useState(false);
  const [currentViewName, currentViewNameChange] = useState("Week");
  const setCalendarView = (view: string) => currentViewNameChange(view);
  const currentDate = DateFormatUtil.getCurrentDate();
  const commitChanges = ({ deleted }: { deleted: string }) => {
    setData((appointments: Appointment[]) =>
      deleteAppointment(appointments, deleted, auth.accessToken)
    );
  };
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
          throw new Error(`Failed fetching data. Status: ${response.status}`);
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
  return (
    <Paper>
      <Grid
        justifyContent="space-around"
        alignItems="center"
        padding={10}
        paddingLeft={15}
      >
        <GroupByScheduleSection
          selectGrouping={selectGrouping}
          selectedBoth={selectedBoth}
          isGroupedByDate={isGroupedByDate}
          setGroupByDate={setGroupByDate}
          isBoth={isBoth}
          numberOfGroups={grouping.length}
        />
        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCalendarView}
          />
          <EditingState onCommitChanges={commitChanges} />
          {isLoading ? null : (
            <GroupingState
              grouping={grouping}
              groupByDate={() => isGroupedByDate}
            />
          )}
          <Toolbar />
          <DayView startDayHour={10} endDayHour={20} />
          <WeekView startDayHour={10} endDayHour={20} />
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

export default withSnackbar(SeminarCalendar);
