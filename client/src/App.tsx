import { ThemeProvider } from "@emotion/react";
import SeminarList from "./components/SeminarSchedulePage/SeminarList";
import SeminarCalendar from "./components/MySeminarSchedulePage/SeminarCalendar";
import { themeOptions } from "./components/DarkTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarAndMenu from "./components/Menu";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AuthProvider from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import HomePage from "./components/HomePage";
import Missing from "./components/Missing";

function App() {
  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <NavBarAndMenu />
            <Routes>
              {/* public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/seminar-schedule" element={<SeminarList />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* protected routes */}
              {/* TODO: add your protected routes here, examples are commented out */}
              <Route
                element={<RequireAuth allowedRoles={["User", "Speaker"]} />}
              >
                <Route
                  path="/calendar-schedule"
                  element={<SeminarCalendar />}
                />
              </Route>
              {/* <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
                <Route path="/seminar-schedule" element={<SeminarList />} />
              </Route> */}
              {/* <Route
                element={<RequireAuth allowedRoles={["User", "Speaker"]} />}
              >
                <Route path="/seminar-schedule" element={<SeminarList />} />
              </Route> */}

              <Route path="*" element={<Missing />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
