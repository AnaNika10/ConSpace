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
import { UserDataProvider } from "../../dataProviders/UserDataProvider";
import { Note } from "../../models/Note";
import { FormBox } from "./FormBox";

export function NoteCard({ note, token }: { note: Note; token: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleDelete = () => {
    console.log(note.id);
    UserDataProvider.deleteNote(note.id!, token);
  };
  const handleEdit = () => {
    setOpen(true);
  };
  const editNote = (event: React.FormEvent<HTMLFormElement>) => {
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
      id: note.id,
      title: title!,
      content: content!,
    };
    UserDataProvider.editNote(updatedNote, token);
  };
  const isFilled = (e: any) => {
    if (e.target.value !== "") {
      setError(false);
    }
  };
  return (
    <>
      <Card key={note.id} sx={{ maxWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {note.title}
          </Typography>
          <Typography variant="body2">{note.content}</Typography>
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
