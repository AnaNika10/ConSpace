import { ThemeProvider } from "@emotion/react";
import SeminarList from "./components/SeminarList";
import { themeOptions } from "./components/DarkTheme";

function App() {
  return  (
    <ThemeProvider theme={themeOptions}>
      <SeminarList/>
    </ThemeProvider>
    
  )
}

export default App;
