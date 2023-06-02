import { ThemeProvider } from "@emotion/react";
import SeminarList from "./components/SeminarList";
import SeminarCalendar from "./components/SeminarCalendar";
import { themeOptions } from "./components/DarkTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarAndMenu from "./components/Menu";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <BrowserRouter>
          <NavBarAndMenu />
          <Routes>
            <Route path="/seminar-schedule" element={<SeminarList />} />
            <Route path="/calendar-schedule" element={<SeminarCalendar />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
