import { Add } from "@mui/icons-material";
import {
  Grid,
  Stack,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { Note } from "../../models/Note";
import { FormDialog } from "./FormDialog";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";

export function EmptyNotesList({ token }: { token: string }) {
  const [error, setError] = useState(false);
  const addNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let title = null;
    let content = null;
    if (data.get("title") !== undefined) {
      title = data.get("title")?.toString();
    }
    if (data.get("content") !== undefined) {
      content = data.get("content")?.toString();
    }
    if (title === "" || content === "") {
      setError(true);
      return;
    }
    const note: Note = {
      Title: title!,
      Content: content!,
    };

    await UserDataProvider.addNote(note, token);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isFilled = (e: any) => {
    if (e.target.value !== "") {
      setError(false);
    }
  };
  return (
    <div>
      <Grid
        container
        spacing={5}
        justifyContent="space-around"
        paddingLeft={25}
        paddingRight={15}
        paddingTop={20}
      >
        <Stack spacing={5} paddingLeft={25}>
          <Typography variant="h5" color={"GrayText"}>
            Add you first note here:{" "}
          </Typography>
          <Button
            onClick={handleOpen}
            variant="outlined"
            startIcon={<Add />}
            color="primary"
            size="medium"
          />
        </Stack>
        <Box minHeight={100}>
          <Dialog open={open} onClose={handleClose}>
            <Box component="form" onSubmit={addNote}>
              <FormDialog error={error} onChange={isFilled} />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
      </Grid>
    </div>
  );
}
