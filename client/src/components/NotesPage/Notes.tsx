import { Grid, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { Note } from "../../models/Note";
import { Add } from "@mui/icons-material";
import { EmptyNotesList } from "./EmptyNotesList";
import { FormBox } from "./FormBox";
import { NoteCard } from "./NoteCard";
import withSnackbar from "../Common/SnackBarWrapper";
import { GET_ALL_NOTES_URL } from "../../constants/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";
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
      title: title!,
      content: content!,
    };

    await UserDataProvider.addNote(note, token);
    handleClose();
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

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllNotes = async () => {
      try {
        const response = await axiosPrivate.get(GET_ALL_NOTES_URL, {
          signal: controller.signal,
        });

        isMounted && setLoading(false);
        isMounted && setError(null);
        isMounted && setData(response.data);
      } catch (err: any) {
        isMounted && setError(err.message);
        isMounted && setData([]);
        navigate("/sign-in", { state: { from: location }, replace: true });
      } finally {
        isMounted && setLoading(false);
      }
    };

    getAllNotes();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/notes")) {
        controller.abort();
      }
    };
  }, [location.pathname, data, auth]);

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
