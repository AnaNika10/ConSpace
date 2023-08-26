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
import useAuth from "../../hooks/useAuth";
import { Appointment } from "../../models/Appointment";
import GroupByScheduleSection from "./GroupScheduleBySection";
import { ResourceUtil } from "./ResourcesUtil";
import { AppointmentContent } from "./AppointmentContent";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import withSnackbar from "../Common/SnackBarWrapper";
import { GET_SCHEDULE_URL } from "../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";

async function deleteAppointment(
  appointments: Appointment[],
  deleted: string,
  token: string
) {
  if (deleted !== undefined) {
    await UserDataProvider.deleteSeminarFromSchedule(token, deleted);

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
  const commitChanges = async ({ deleted }: { deleted: string }) => {
    try {
      const updatedAppointments = await deleteAppointment(
        data,
        deleted,
        auth.accessToken
      );
      setData(updatedAppointments);
    } catch (error: any) {
      setError(error.message);
    }
  };
  const selectGrouping = (group: { resourceName: string }[]) =>
    setGrouping(group);
  const selectedBoth = (both: boolean) => setBoth(both);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSchedule = async () => {
      try {
        const response = await axiosPrivate.get(GET_SCHEDULE_URL, {
          signal: controller.signal,
        });

        isMounted && setLoading(false);
        isMounted && setError(null);
        isMounted && setData(response.data);
      } catch (err: any) {
        isMounted && setError(err.message);
        isMounted && setData([]);
        navigate("/sign-in", { state: { from: location }, replace: true });
      } finally {
        isMounted && setLoading(false);
      }
    };

    getSchedule();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/calendar-schedule")) {
        controller.abort();
      }
    };
  }, [location.pathname, data, auth]);

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
