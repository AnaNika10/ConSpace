import { Grid, Paper } from "@mui/material";
import { Scheduler, DayView, Appointments, AppointmentTooltip, WeekView, ViewSwitcher, Toolbar, TodayButton, DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { useEffect, useState } from "react";
import { UserDataProvider } from "../dataProviders/UserDataProvider";
import useAuth from "../hooks/useAuth";

// todo incorporate timezone offset
function formatDate(date: Date) {
  const coeff = 1000 * 60;
  const rounded = new Date(Math.round(date.getTime() / coeff) * coeff)
  return rounded.toISOString().substring(0, 16);
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
  }, []);
  console.log(data);
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
            <AppointmentTooltip showCloseButton/>
          </Scheduler>
        </Grid>
      </Paper>
  );
}