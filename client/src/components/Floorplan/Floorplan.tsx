import {
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";

interface Seminar {
  seminarId: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
}

export default function Floorplan() {
  const [halls, setHalls] = useState<string[]>([]);
  const [seminars, setSeminars] = useState<Record<string, Seminar[]>>({});

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getHalls = async () => {
      try {
        const response = await axiosPrivate.get("/GetHalls", {
          signal: controller.signal,
        });

        isMounted && setHalls(response.data);
      } catch (err) {
        console.error(err);
        isMounted && setHalls([]);
        navigate("/sign-in", { state: { from: location }, replace: true });
      }
    };

    getHalls();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/floorplan")) {
        controller.abort();
      }
    };
  }, [location.pathname, auth]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSeminarsForHalls = async () => {
      const seminarDataPromises = halls.map(async (hall) => {
        try {
          const response = await axiosPrivate.get(
            `/FilterConferences?Hall=${encodeURIComponent(hall)}`,
            {
              signal: controller.signal,
            }
          );

          return {
            hallName: hall,
            seminars: response.data,
          };
        } catch (err) {
          console.error(`Error fetching seminars for ${hall}:`, err);
          return {
            hallName: hall,
            seminars: [],
          };
        }
      });

      const seminarDataList = await Promise.all(seminarDataPromises);

      const seminarsByHall: Record<string, Seminar[]> = {};
      seminarDataList.forEach(({ hallName, seminars }) => {
        seminarsByHall[hallName] = seminars;
      });

      isMounted && setSeminars(seminarsByHall);
    };

    getSeminarsForHalls();

    return () => {
      isMounted = false;

      if (!location.pathname.startsWith("/floorplan")) {
        controller.abort();
      }
    };
  }, [location.pathname, halls, auth]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {halls.map((hall, index) => {
        const sortedSeminars = seminars[hall]
          ?.slice()
          .sort(
            (a, b) =>
              new Date(a.startDateTime).getTime() -
              new Date(b.startDateTime).getTime()
          );

        if (index % 2 === 0) {
          return (
            <Fragment key={hall}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "16px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    width: "500px",
                    marginLeft: "150px",
                  }}
                >
                  <Typography variant="h6">{hall}</Typography>
                  {sortedSeminars && sortedSeminars.length > 0 ? (
                    sortedSeminars.map((seminar) => (
                      <div key={seminar.seminarId} style={{ margin: "8px 0" }}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{seminar.name}</Typography>
                            <Divider style={{ margin: "12px 0" }} />
                            <Typography variant="body2">
                              <strong>Date:</strong>{" "}
                              {format(
                                new Date(seminar.startDateTime),
                                "dd MMM yyyy"
                              )}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Time:</strong>{" "}
                              {format(
                                new Date(seminar.startDateTime),
                                "hh:mm a"
                              )}{" "}
                              -{" "}
                              {format(new Date(seminar.endDateTime), "hh:mm a")}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                    ))
                  ) : (
                    <Typography variant="body2">
                      No seminars scheduled
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Fragment>
          );
        } else {
          // For odd index, continue the previous row
          const prevHall = halls[index - 1];
          const prevSortedSeminars = seminars[prevHall]
            ?.slice()
            .sort(
              (a, b) =>
                new Date(a.startDateTime).getTime() -
                new Date(b.startDateTime).getTime()
            );

          return (
            <Grid item key={hall} xs={12} md={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  width: "500px",
                  marginLeft: "150px",
                }}
              >
                <Typography variant="h6">{hall}</Typography>
                {prevSortedSeminars && prevSortedSeminars.length > 0 ? (
                  prevSortedSeminars.map((seminar) => (
                    <div key={seminar.seminarId} style={{ margin: "8px 0" }}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">{seminar.name}</Typography>
                          <Divider style={{ margin: "12px 0" }} />
                          <Typography variant="body2">
                            <strong>Date:</strong>{" "}
                            {format(
                              new Date(seminar.startDateTime),
                              "dd MMM yyyy"
                            )}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Time:</strong>{" "}
                            {format(new Date(seminar.startDateTime), "hh:mm a")}{" "}
                            - {format(new Date(seminar.endDateTime), "hh:mm a")}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2">No seminars scheduled</Typography>
                )}
              </Paper>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}
