import { Fab, Grid, List, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Speaker } from "../../models/Speaker";
import { SpeakerItem } from "./SpeakerItem";
import useAuth from "../../hooks/useAuth";
import { SpeakerForm } from "./SpeakerForm";
import { Add } from "@mui/icons-material";
import jwtDecode from "jwt-decode";
import withSnackbar from "../Common/SnackBarWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const emptySpeaker: Speaker = {
  name: "",
  position: "",
  company: "",
  bioInfo: "",
  email: "",
};
const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function SpeakersList({
  setMessage,
}: {
  speaker: Speaker;
  isOpened: boolean;
  displayEventInfo: (a: boolean) => void;
  setMessage: (msg: string) => void;
}) {
  const { auth } = useAuth();
  const decoded: any = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const [data, setData] = useState<Speaker[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const handleOpen = () => setOpenForm(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllSpeakers = async () => {
      try {
        const response = await axiosPrivate.get("/Speaker", {
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

    getAllSpeakers();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/speakers")) {
        controller.abort();
      }
    };
  }, [location.pathname, data, auth]);

  return (
    <Grid
      container
      justifyContent="space-around"
      paddingTop={15}
      paddingBottom={15}
    >
      <Paper elevation={3}>
        <List>
          {!isLoading &&
            data.map((speaker: Speaker) => {
              return (
                <SpeakerItem
                  speaker={speaker}
                  setMessage={setMessage}
                  key={speaker.speakerId}
                />
              );
            })}
        </List>
        {isAdmin && (
          <Fab sx={fabStyle} color="primary" aria-label="add">
            <Add onClick={handleOpen} />
          </Fab>
        )}
        {isAdmin && (
          <SpeakerForm
            isOpened={openForm}
            displayEventInfo={() => setOpenForm(false)}
            speaker={emptySpeaker}
            setMessage={setMessage}
          />
        )}
      </Paper>
    </Grid>
  );
}

export default withSnackbar(SpeakersList);
