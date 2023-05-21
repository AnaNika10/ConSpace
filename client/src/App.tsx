import { ThemeProvider } from "@emotion/react";
import SeminarList from "./components/SeminarList";
import { themeOptions } from "./components/DarkTheme";
import NavBar from "./components/NavigationBar";
import { Card, CssBaseline, Paper } from "@mui/material";

function App() {
  return  (
    <>
      <ThemeProvider theme={themeOptions}>
      <CssBaseline/>
          <NavBar/>
          <SeminarList/>
      </ThemeProvider>
    </>
    
  )
}

export default App;
