import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";

import Play from "./views/play";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#609732",
    },
    secondary: {
      main: "#B9E397",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Play />
      </ThemeProvider>
    </div>
  );
}

export default App;
