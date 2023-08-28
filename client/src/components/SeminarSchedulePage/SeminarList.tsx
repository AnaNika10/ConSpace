import { Grid, List, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Seminar } from "../../models/Seminar";
import { ConferenceDateUtil } from "./ConferenceDateUtil";
import { SeminarTabs } from "./SeminarTabs";
import { SeminarListItem } from "./SeminarListItem";
import withSnackbar from "../Common/SnackBarWrapper";
import { SeminarDataProvider } from "../../dataProviders/SeminarDataProvider";
import useAuth from "../../hooks/useAuth";

function SeminarList() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [dayOfSeminar, setDay] = useState(1);
  const { auth } = useAuth();
  const setDayOfSeminar = (day: number) => {
    setDay(day);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SeminarDataProvider.fetchSeminarSchedule(
          auth.accessToken
        );
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
    fetchData();
  }, []);

  const getSeminarsForSelectedDay = () => {
    return ConferenceDateUtil.filterSeminarsByDay(data, dayOfSeminar);
  };
  const getDays = () => {
    return ConferenceDateUtil.mapToDay(data);
  };
  console.log(getSeminarsForSelectedDay());
  return (
    <Grid
      container
      justifyContent="space-around"
      paddingTop={15}
      paddingBottom={15}
    >
      <Paper elevation={3}>
        <SeminarTabs setDay={setDayOfSeminar} dayOfSeminar={getDays()} />
        <List>
          {!isLoading &&
            getSeminarsForSelectedDay().map((seminar: Seminar) => {
              return (
                <SeminarListItem seminar={seminar} key={seminar.seminarId} />
              );
            })}
        </List>
      </Paper>
    </Grid>
  );
}

export default withSnackbar(SeminarList);
