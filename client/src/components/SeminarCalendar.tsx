import { Grid, Paper } from "@mui/material";
import { Scheduler, DayView, Appointments, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

const appointments = [
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: formatDate(new Date(2023, 4, 28, 13, 11)),
    endDate: formatDate(new Date(2023, 4, 28, 14, 0)),
    id: 1,
    location: 'Room 1',
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: formatDate(new Date(2023, 4, 28, 17, 11)),
    endDate: formatDate(new Date(2023, 4, 28, 18, 0)),
    id: 2,
    location: 'Room 1',
  }
];

// todo incorporate timezone offset
function formatDate(date: Date) {
  const coeff = 1000 * 60;
  const rounded = new Date(Math.round(date.getTime() / coeff) * coeff)
  return rounded.toISOString().substring(0, 16);
}

// todo pass data to component
export default function SeminarCalendar(){ 
  const currentDate = new Date().toISOString().substring(0, 10);
    return (
     <Paper>
        <Grid justifyContent="space-around" alignItems="center" padding={10} paddingLeft={15}>
          <Scheduler data={appointments}>
            <ViewState
              currentDate={currentDate}
            />
            <DayView
              startDayHour={10}
              endDayHour={20}
            />
            <Appointments />
            <AppointmentTooltip showCloseButton/>
          </Scheduler>
        </Grid>
      </Paper>
  );
}