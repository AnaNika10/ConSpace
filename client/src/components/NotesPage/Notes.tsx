import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Stack,
  FormControl,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Fab,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";
import { Note } from "../../models/Note";
import { Delete, Edit, Add } from "@mui/icons-material";

function NoteCard({ note, token }: { note: Note; token: string }) {
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
      <Box minHeight={100}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box component="form" onSubmit={editNote}>
            <FormDialog error={error} onChange={isFilled} />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Submit changes</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </>
  );
}
function EmptyNotesList({ token }: { token: string }) {
  const [error, setError] = useState(false);
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
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
      title: title!,
      content: content!,
    };
    UserDataProvider.addNote(note, token);
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

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function FormDialog({
  error,
  onChange,
}: {
  error: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <DialogContent>
        <FormControl>
          <Stack spacing={5}>
            <TextField
              error={error}
              onChange={onChange}
              helperText="Field must not be empty."
              id="title"
              label="Title"
              variant="filled"
              name="title"
            />
            <TextField
              error={error}
              onChange={onChange}
              helperText="Field must not be empty."
              id="content"
              multiline
              name="content"
              rows={4}
              variant="filled"
              size="medium"
              label="Note"
            />
          </Stack>
        </FormControl>
      </DialogContent>
    </>
  );
}
function AddNote({ token }: { token: string }) {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
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
      title: title!,
      content: content!,
    };
    UserDataProvider.addNote(note, token);
  };
  const isFilled = (e: any) => {
    if (e.target.value !== "") {
      setError(false);
    }
  };
  return (
    <>
      <Fab sx={fabStyle} color="primary" aria-label="add">
        <Add onClick={handleOpen} />
      </Fab>
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
    </>
  );
}
export default function Notes() {
  const [data, setData] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserDataProvider.getAllNotes(auth.accessToken);
        if (!response.ok) {
          throw new Error(`Failed fetching data. Status: ${response.status}`);
        }
        const actual = await response.json();
        setLoading(false);
        setError(null);
        setData(actual);
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data, auth]);
  return (
    <>
      {data.length === 0 ? (
        <EmptyNotesList token={auth.accessToken} />
      ) : (
        <Grid
          container
          spacing={5}
          justifyContent="space-around"
          paddingLeft={25}
          paddingRight={15}
        >
          {!isLoading &&
            data.map((note) => {
              return (
                <Grid key={note.id} item xs={4}>
                  <NoteCard note={note} token={auth.accessToken} />
                </Grid>
              );
            })}
          <AddNote token={auth.accessToken} />
        </Grid>
      )}
    </>
  );
}
