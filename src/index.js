import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { UserProvider } from "./Components/Utils/UserContext";
import SubJobCard from "./Components/SubJobCard/SubJobCard.js";
import JobCardV2 from "./Components/JobCardV2/JobCardV2.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<JobCardV2 />} />
      <Route path="/subjob/:id" element={<SubJobCard  />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>      
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
