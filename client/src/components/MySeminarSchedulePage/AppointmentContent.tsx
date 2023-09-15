import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { MicOutlined, Room } from "@mui/icons-material";
import { Divider, Grid, Link, Stack } from "@mui/material";
import { Appointment } from "../../models/Appointment";

export const AppointmentContent = ({
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
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    </>
  );
};
