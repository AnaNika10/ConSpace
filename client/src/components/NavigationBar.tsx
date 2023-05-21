import { Button, Container, Grid, Stack, Typography } from "@mui/material";

export default function NavBar() {

    return (
        <Grid>
            <Container maxWidth={false}>
                <Stack direction={"row"} justifyContent="space-around" alignItems="center">
                    <Typography  variant="h2" color={"#9c27b0"} fontFamily={"sans-serif"}>
                        ConSpace
                    </Typography>
                    <Grid container justifyContent="flex-end">
                        <Button sx={{color: "white"}}>
                            Seminar Schedule
                        </Button>
                        <Button sx={{color: "white"}}>
                            Exhibitors
                        </Button>
                        <Button sx={{color: "white"}}>
                            Floorplan
                        </Button>
                        <Button variant="contained">Sign up</Button>
                    </Grid>
                </Stack>
            </Container>
        </Grid>
    )
}