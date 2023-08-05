import { Divider, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { Scheduler, DayView, Appointments, AppointmentTooltip, WeekView, ViewSwitcher, Toolbar, TodayButton, DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { useEffect, useState } from "react";
import { UserDataProvider } from "../dataProviders/UserDataProvider";
import useAuth from "../hooks/useAuth";
import { PlayCircleOutlineOutlined, Room, Stop, StopCircleOutlined } from "@mui/icons-material";
import { Appointment } from "../models/Appointment";

// todo incorporate timezone offset
function formatDate(dateString: string) {
  return dateString.substring(11, 16);
}

const AppointmentContent = ({appointmentData, ...restProps} : {appointmentData: Appointment, restProps: any[]}) => {
  console.log(appointmentData);
  console.log(typeof appointmentData.startDate);
  return <>
      <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container direction="column" alignItems="left" paddingLeft={2.5} spacing={5}>
      <Grid item xs={20}>
        <Stack direction={"row"} spacing={2.5}>
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
  const [data , setData] = useState([]);
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
            <Appointments />
            <AppointmentTooltip 
              contentComponent = {AppointmentContent}
              showCloseButton />
          </Scheduler>
        </Grid>
      </Paper>
  );
}