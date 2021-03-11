import "./custom.css"
import WebFont from "webfontloader";

import { Container, Grid, Typography, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Content from "./Content";

WebFont.load({
  google: {
    families: ["Poppins:100,300,400,500", "sans-serif"],
  },
});

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#ff5000",
    },
    secondary: {
      main: "#000",
    },
    warning: {
      main: "#ffbf00",
    },
    error: {
      main: "#eb4034",
    },
    success: {
      main: "#76A30F",
    },
  },
  // palette: {
  //   primary: {
  //     // Purple and green play nicely together.
  //     main: purple[500],
  //   },
  //   secondary: {
  //     // This is green.A700 as hex.
  //     main: "#11cb5f",
  //   },
  // },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={5} justify="center">
          <Grid item container xs={12} justify="center">
              <Typography
                align="center"
                color="secondary"
                variant="h1"
              >
                Dogs
              </Typography>
          </Grid>
          <Content/>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
