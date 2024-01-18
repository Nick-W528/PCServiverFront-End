import { Box } from "@mui/material";
import Sidenav from "../Sidenav/Sidenav";
import OrderLayout from "../OrdersLayout/OrderLayout";

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>      
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <OrderLayout />
      </Box>
    </Box>
  );
}

export default Layout;
