import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";

export default function NavBar() {

    return (
        <Container maxWidth={false} disableGutters>
            <Stack direction={"row"} spacing={3} justifyContent="space-around" alignItems="center">
                <Typography  variant="h2" color={"#9c27b0"} fontFamily={"sans-serif"}>
                    ConSpace
                </Typography>
                <Grid container justifyContent={"flex-end"}>
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
            <Divider sx={{color: "white"}}/>
        </Container>
    )
}