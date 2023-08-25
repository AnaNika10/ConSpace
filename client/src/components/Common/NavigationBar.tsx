import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

export default function NavBar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

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
              onClick={signOut}
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
