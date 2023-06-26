import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { ReactFlowProvider } from "reactflow";
import App from "./App";
import theme from "./theme";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      {/* <CookiesProvider> */}
      {/* <Auth /> */}
      <StyledEngineProvider injectFirst>
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </StyledEngineProvider>
      {/* </CookiesProvider> */}
    </BrowserRouter>
  </ThemeProvider>
);
