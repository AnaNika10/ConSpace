import { AppBar, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuDrawer from "./Menu";

export default function NavBar() {

    return (
        <Grid>
            <Container maxWidth={false}>
                <AppBar position="fixed"  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Stack direction={"row"} justifyContent="space-around" alignItems="center">
                    <Typography  variant="h2" color={"#9c27b0"} fontFamily={"sans-serif"}>
                        ConSpace
                    </Typography>
                    <Grid container justifyContent="flex-end">
                        <Link to={"/seminar-schedule"}>
                        <Button sx={{color: "white"}}>
                            Seminar Schedule
                        </Button>
                        </Link>
                        <Link to={"/exhibitors"}>
                        <Button sx={{color: "white"}}>
                            Exhibitors
                        </Button>
                        </Link>
                        <Link to={"/floorplan"}/>
                        <Button sx={{color: "white"}}>
                            Floorplan
                        </Button>
                        <Button variant="contained">Sign up</Button>
                    </Grid>
                </Stack>
                </AppBar>
            </Container>
            <MenuDrawer/>
        </Grid>
    )
}