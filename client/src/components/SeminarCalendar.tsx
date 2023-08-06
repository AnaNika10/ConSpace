import { Divider, Grid, Link, Paper, Stack } from "@mui/material";
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
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { useEffect, useState } from "react";
import { UserDataProvider } from "../dataProviders/UserDataProvider";
import useAuth from "../hooks/useAuth";
import { MicOutlined, Room } from "@mui/icons-material";
import { Appointment } from "../models/Appointment";

const AppointmentContent = ({appointmentData, ...restProps} : {appointmentData: Appointment, restProps: any[]}) => {
  return <>
      <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container direction="column" alignItems="left" paddingLeft={2.5} spacing={5}>
      <Grid item xs={20}>
        <Stack direction={"row"} spacing={2.5} paddingY={1}>
          <MicOutlined/>
            <span>{appointmentData.speakers}</span>
        </Stack>
        <Stack direction={"row"} spacing={2.5} paddingY={1}>
          <Room/>
            <span>{appointmentData.location}</span>
        </Stack>
        <Divider/>
        <Link paddingLeft={5} color="primary">
          "http://path-to-seminar-schedule-page"
        </Link>
      </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  </>
  
}

export default function SeminarCalendar(){ 
  const [data , setData] = useState<Appointment[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const { auth } = useAuth();
  const [currentViewName, currentViewNameChange] = useState("Week");
  const setCalendarView = (name : string) => {
    currentViewNameChange(name);
  };

  useEffect(() => {
    const fetchData = async () => { 
    try{    
        const response =  await UserDataProvider.fetchUserSchedule(auth.accessToken);
        if(!response.ok) {
            throw new Error("Failed fetching data");
        }
        const actual = await response.json();
        setLoading(false);
        setError(null);
        setData(actual)
    }catch(err: any) {
        setError(err.message);
        setData([]);
    } finally {
        setLoading(false);
    }
  }  
      fetchData();
  }, [auth, data]);

  const commitChanges = ({ deleted } : {deleted : string}) => {
    setData((state : Appointment[]) => {
      if (deleted !== undefined) {
        UserDataProvider.deleteSeminarFromSchedule(deleted, auth.accessToken)
        // next line maybe isnt needed?
        state = state.filter((appointment: Appointment) => appointment.id !== deleted);

      }
      return state;
    });

  }
  const currentDate = new Date().toISOString().substring(0, 10);
  
  return (
     <Paper>
        <Grid justifyContent="space-around" alignItems="center" padding={10} paddingLeft={15}>
          <Scheduler data={data}>
            <ViewState
              defaultCurrentDate = {currentDate}
              currentViewName = {currentViewName}
              onCurrentViewNameChange={setCalendarView}
            />
            <EditingState onCommitChanges={commitChanges}/>
            <IntegratedEditing />
            <DayView
              startDayHour={10}
              endDayHour={20}
            />
            <WeekView 
              startDayHour={10}
              endDayHour={20}
            />
            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip 
              contentComponent = {AppointmentContent}
              showCloseButton
              showDeleteButton />
              <CurrentTimeIndicator
                shadePreviousCells={true}
                shadePreviousAppointments={true}
              />
          </Scheduler>
        </Grid>
      </Paper>
  );
}