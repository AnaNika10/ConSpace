import { ThemeProvider } from "@emotion/react";
import SeminarList from "./components/SeminarSchedulePage/SeminarList";
import SeminarCalendar from "./components/MySeminarSchedulePage/SeminarCalendar";
import { themeOptions } from "./components/Common/DarkTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarAndMenu from "./components/Common/Menu";
import RequireAuth from "./components/Authorization/RequireAuth";
import Missing from "./components/Common/Missing";
import SignIn from "./components/Authorization/SignIn";
import SignUp from "./components/Authorization/SignUp";
import Unauthorized from "./components/Authorization/Unauthorized";
import AuthProvider from "./context/AuthProvider";
import Notes from "./components/NotesPage/Notes";
import PersistLogin from "./components/Authorization/PersistLogin";
import Faqs from "./components/FAQs/Faqs";
import HomePage from "./components/Common/HomePage";
import Floorplan from "./components/Floorplan/Floorplan";
import Notifications from "./components/NotificationsPage/Notifications";
import SpeakerList from "./components/Speaker/SpeakerList";
import { ExhibitorsList } from "./components/Exhibitor/ExhibitorsList";

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
              <Route path="/floorplan" element={<Floorplan />} />
              <Route path="/faqs" element={<Faqs />} />

              {/* protected routes */}
              <Route element={<PersistLogin />}>
                <Route
                  element={<RequireAuth allowedRoles={["User", "Speaker"]} />}
                >
                  <Route
                    path="/calendar-schedule"
                    element={<SeminarCalendar />}
                  />

                  <Route path="/notes" element={<Notes />} />

                  <Route path="/notifications" element={<Notifications />} />
                </Route>

                <Route
                  element={
                    <RequireAuth
                      allowedRoles={["User", "Speaker", "Administrator"]}
                    />
                  }
                >
                  <Route path="/speakers" element={<SpeakerList />} />
                  <Route path="/exhibitors" element={<ExhibitorsList />} />
                </Route>
              </Route>

              <Route path="*" element={<Missing />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
