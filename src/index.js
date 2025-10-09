import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "./Components/Utils/UserContext";
import { AppProvider } from "./Components/Utils/AppContext.js";
import theme from "./theme/index.js";
import SubJobCard from "./Components/Jobs/SubJobCard/SubJobCard.js";
import JobCard from "./Components/Jobs/JobCard/JobCard.js";
import { StyledEngineProvider } from "@mui/material/styles";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<JobCard />} />
      <Route path="/subjob/:id" element={<SubJobCard />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
