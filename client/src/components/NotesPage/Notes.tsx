import { Grid, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";
import { Note } from "../../models/Note";
import { Add } from "@mui/icons-material";
import { EmptyNotesList } from "./EmptyNotesList";
import { FormBox } from "./FormBox";
import { NoteCard } from "./NoteCard";
import withSnackbar from "../Common/SnackBarWrapper";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

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
      <FormBox
        open={open}
        handleClose={handleClose}
        isFilled={isFilled}
        onSubmit={addNote}
        error={error}
      />
    </>
  );
}
function Notes() {
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

export default withSnackbar(Notes);
