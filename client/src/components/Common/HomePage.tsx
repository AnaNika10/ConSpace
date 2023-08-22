import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import withSnackbar from "./SnackBarWrapper";

function HomePage() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome!
      </Typography>
    </Container>
  );
}
export default withSnackbar(HomePage);
