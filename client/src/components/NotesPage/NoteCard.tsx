import { Edit, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Note } from "../../models/Note";
import { FormBox } from "./FormBox";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";

export function NoteCard({ note, token }: { note: Note; token: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleDelete = async () => {
    console.log(note.Id);
    await UserDataProvider.deleteNote(note.Id!, token);
  };
  const handleEdit = () => {
    setOpen(true);
  };
  const editNote = async (event: React.FormEvent<HTMLFormElement>) => {
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
    const updatedNote: Note = {
      Id: note.Id,
      Title: title!,
      Content: content!,
    };
    await UserDataProvider.editNote(updatedNote, token);
    setOpen(false);
  };
  const isFilled = (e: any) => {
    if (e.target.value !== "") {
      setError(false);
    }
  };
  return (
    <>
      <Card key={note.Id} sx={{ maxWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {note.Title}
          </Typography>
          <Typography variant="body2">{note.Content}</Typography>
        </CardContent>
        <CardActions>
          <Stack direction={"row"} spacing={12}>
            <Button size="small" startIcon={<Edit />} onClick={handleEdit}>
              Edit
            </Button>
            <Button size="small" startIcon={<Delete />} onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </CardActions>
      </Card>
      <FormBox
        open={open}
        handleClose={() => setOpen(false)}
        isFilled={isFilled}
        onSubmit={editNote}
        error={error}
      />
    </>
  );
}
