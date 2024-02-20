import { Box, Grid } from "@mui/material";
import Sidenav from "../Sidenav/Sidenav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>        
        <Grid container spacing={2} style={{ marginTop: 64 }}>
          <Outlet />
        </Grid>
      </Box>
    </Box>
  );
}

export default Layout;
