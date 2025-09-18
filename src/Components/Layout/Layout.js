import { Box, Grid } from "@mui/material";
import Sidenav from "../Sidenav/Sidenav";
import { Outlet } from "react-router-dom";
import DatePicker from "../DatePicker/DatePicker";

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2} style={{ marginTop: 64 }}>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <DatePicker />
          </Grid>
          <Grid item xs={8} spacing={2}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Layout;
