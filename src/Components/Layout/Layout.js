import { Box } from "@mui/material";
import Sidenav from "../Sidenav/Sidenav";
import OrderLayout from "../OrdersLayout/OrderLayout";

function Layout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <OrderLayout />            
        </Box>
    )
}

export default Layout