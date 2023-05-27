import { Grid, Paper } from "@mui/material";
import { Scheduler, DayView, Appointments, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

// todo pass data to component
export default function SeminarCalendar(){ 
    return (
     <Paper>
        <Grid justifyContent="space-around" alignItems="center" padding={10} paddingLeft={15}>
          <Scheduler data={Array.of("seminar1", "seminar2")}>
            <DayView
              startDayHour={10}
              endDayHour={20}
            />
            <Appointments />
            <AppointmentTooltip />
          </Scheduler>
        </Grid>
      </Paper>
  );
}
  