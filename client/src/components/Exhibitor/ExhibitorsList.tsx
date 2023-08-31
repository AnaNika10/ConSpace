import { Fab, Grid, List, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Exhibitor } from "../../models/Exhibitor";
import { ExhibitorItem } from "./ExhibitorItem";
import useAuth from "../../hooks/useAuth";
import { ExhibitorForm } from "./ExhibitorForm";
import { Add } from "@mui/icons-material";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const emptyExhibitor: Exhibitor = {
  name: "",
  stand: 0,
  description: ""

};
const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export function ExhibitorsList()
 {
  const { auth } = useAuth();
  const decoded: any = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const [data, setData] = useState<Exhibitor[]>([]);
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

    const getAllExhibitors = async () => {
      try {
        const response = await axiosPrivate.get("/Exhibitor", {
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

    getAllExhibitors();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/exhibitors")) {
        controller.abort();
      }
    };
  }, [location.pathname, data, auth]);

  return (
    <Grid
    container
    spacing={5}
    marginTop={5}
    justifyContent="space-around"
    paddingLeft={25}
    paddingRight={15}
    >
      
          {!isLoading &&
            data.map((exhibitor: Exhibitor) => {
              return (
                <ExhibitorItem
                exhibitor={exhibitor}
                  key={exhibitor.exhibitorId}
                />
              );
            })}
  
        {isAdmin && (
          <Fab sx={fabStyle} color="primary" aria-label="add">
            <Add onClick={handleOpen} />
          </Fab>
        )}
        {isAdmin && (
          <ExhibitorForm
            isOpened={openForm}
            displayEventInfo={() => setOpenForm(false)}
            exhibitor={emptyExhibitor}
          />
        )}
    </Grid>
  );
}


