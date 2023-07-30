import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <Container maxWidth={false}>
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
                    <Link to={"/floorplan"}>
                    <Button sx={{color: "white"}}>
                        Floorplan
                    </Button>
                    </Link>
                    <Button variant="contained">Sign up</Button>
                </Grid>
            </Stack>
        </Container>
    )
}