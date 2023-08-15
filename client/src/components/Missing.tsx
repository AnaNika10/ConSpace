import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Unauthorized() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Missing page
      </Typography>
      <Typography variant="body1" gutterBottom>
        Nothing to see here.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
      >
        Go to Home
      </Button>
    </Container>
  );
}
