import { ThemeProvider } from "@emotion/react";
import SeminarList from "./components/SeminarList";
import { themeOptions } from "./components/DarkTheme";
import NavBar from "./components/NavigationBar";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return  (
    <>
      <ThemeProvider theme={themeOptions}>
      <CssBaseline/>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/seminar-schedule" element={<SeminarList/>} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
    
  )
}

export default App;
