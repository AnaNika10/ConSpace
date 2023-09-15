import { Grid, List, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Seminar } from "../../models/Seminar";
import { ConferenceDateUtil } from "./ConferenceDateUtil";
import { SeminarTabs } from "./SeminarTabs";
import { SeminarListItem } from "./SeminarListItem";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import withSnackbar from "../Common/SnackBarWrapper";
import jwtDecode from "jwt-decode";
import { SeminarDataProvider } from "../../dataProviders/SeminarDataProvider";
import { Appointment } from "../../models/Appointment";
import { UserDataProvider } from "../../dataProviders/UserDataProvider";

function SeminarList() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState<Appointment[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUserData, setLoadingUserData] = useState(true);
  const [errorUserData, setErrorLoadingUserData] = useState(null);
  const [, setError] = useState(null);
  const [dayOfSeminar, setDay] = useState(1);
  const { auth } = useAuth();
  const decoded: any = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const setDayOfSeminar = (day: number) => {
    setDay(day);
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAllSeminars = async () => {
      try {
        const response = await SeminarDataProvider.fetchAllSeminars();
        setLoading(false);
        setError(null);
        setData(response?.data);
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    const getUserSchedule = () => {
      if (!isAdmin && auth.accessToken) {
        const getAllUserSeminars = async () => {
          try {
            const response = await UserDataProvider.fetchUserSchedule(
              auth.accessToken
            );

            setLoadingUserData(false);
            setErrorLoadingUserData(null);
            setUserData(response?.data);
          } catch (err: any) {
            setErrorLoadingUserData(err.message);
            setUserData([]);
            navigate("/sign-in", { state: { from: location }, replace: true });
          } finally {
            setLoadingUserData(false);
          }
        };
        getAllUserSeminars();
      }
    };

    getAllSeminars();
    getUserSchedule();
  }, [location.pathname, data, userData, auth]);

  const getSeminarsForSelectedDay = () => {
    return ConferenceDateUtil.filterSeminarsByDay(data, dayOfSeminar);
  };
  const getDays = () => {
    return ConferenceDateUtil.mapToDay(data);
  };

  return (
    <Grid
      container
      justifyContent="space-around"
      paddingTop={15}
      paddingBottom={15}
    >
      <Paper elevation={3}>
        <SeminarTabs
          setDay={setDayOfSeminar}
          dayOfSeminar={getDays()}
          isAdmin={isAdmin}
        />
        <List>
          {((!isLoading &&
            !isAdmin &&
            !isLoadingUserData &&
            auth.accessToken) ||
            (!isLoading && isAdmin) ||
            (!auth.accessToken && !isLoading)) &&
            getSeminarsForSelectedDay().map((seminar: Seminar) => {
              return (
                <SeminarListItem
                  seminar={seminar}
                  key={seminar.seminarId}
                  userAppointements={userData}
                  isAdmin={isAdmin}
                />
              );
            })}
        </List>
      </Paper>
    </Grid>
  );
}

export default withSnackbar(SeminarList);
