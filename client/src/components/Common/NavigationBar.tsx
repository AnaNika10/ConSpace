import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SignOut from "../Authorization/SignOut";

export default function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <Container maxWidth={false}>
      <Stack
        direction={"row"}
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography variant="h2" color={"#9c27b0"} fontFamily={"sans-serif"}>
          ConSpace
        </Typography>
        <Grid container justifyContent="flex-end">
          <Link to={"/seminar-schedule"}>
            <Button sx={{ color: "white" }}>Seminar Schedule</Button>
          </Link>
          <Link to={"/exhibitors"}>
            <Button sx={{ color: "white" }}>Exhibitors</Button>
          </Link>
          <Link to={"/floorplan"}>
            <Button sx={{ color: "white" }}>Floorplan</Button>
          </Link>
          {!auth.accessToken && (
            <Link to="/sign-up" style={{ marginLeft: "10px" }}>
              <Button variant="contained">Sign Up</Button>
            </Link>
          )}
          {!auth.accessToken && (
            <Link to="/sign-in" style={{ marginLeft: "10px" }}>
              <Button variant="contained">Sign In</Button>
            </Link>
          )}
          {auth.accessToken && (
            <Button
              variant="contained"
              onClick={() => SignOut(auth, setAuth, navigate)}
              style={{ marginLeft: "10px" }}
            >
              Sign Out
            </Button>
          )}
        </Grid>
      </Stack>
    </Container>
  );
}
