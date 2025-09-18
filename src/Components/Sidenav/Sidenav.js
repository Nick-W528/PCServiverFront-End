import {
  AppBar,
  CssBaseline,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import VillaIcon from "@mui/icons-material/Villa";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useUser } from "../Utils/UserContext";
import { Link } from "react-router-dom";

const drawerWidth = 300;

function Sidenav() {
  const { fetchUserData } = useUser();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    fetchUserData(null);
  };

  const menuItems = [
    { title: "Home", href: "/", icon: <VillaIcon sx={{ color: "#F4DFC8" }} /> },
    {
      title: "Completed",
      icon: <AssignmentTurnedInIcon sx={{ color: "#F4DFC8" }} />,
    },
    {
      title: "Create New Project",
      icon: <AddCircleIcon sx={{ color: "#F4DFC8" }} />,
    },
    { title: "Setting", icon: <SettingsIcon sx={{ color: "#F4DFC8" }} /> },
  ];

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#fff',
          color: '#141414',
         }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0c0c0c",
            borderRight: "1px solid #262626",
            color: "#fff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item, key) => (
            <Link key={key} to={item.href} style={{ textDecoration: "none" }}>
            <ListItem key={key} disablePadding sx={{ margin: "20px 0px" }}>              
                <ListItemButton
                  sx={{                    
                    margin: "0 16px",
                    padding: "10px",
                    borderRadius: "10px",
                    transition: "0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#F4DFC8",
                      "& .MuiListItemText-root": {
                        color: "#0c0c0c !important",
                      },
                      "& .menu_icon svg": {
                        color: "#0c0c0c !important",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{minWidth:35}}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: "#F4DFC8",
                      textTransform: "uppercase",
                      "& .MuiTypography-root": {
                        fontWeight: "bold",
                        fontSize: 14,
                      },
                    }}
                  />
                </ListItemButton>              
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider sx={{ borderColor: "#262626" }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                margin: "0 16px",
                padding: "10px",
                borderRadius: "10px",
                transition: "0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#F4DFC8",
                  "& .MuiListItemText-root": {
                    color: "#0c0c0c !important",
                  },
                  "& .menu_icon svg": {
                    color: "#0c0c0c !important",
                  },
                },
              }}
            >
              <ListItemIcon className="menu_icon">
                <PowerSettingsNewIcon sx={{ color: "#F4DFC8" }} />
              </ListItemIcon>
              <ListItemText
                primary="Log Out"
                sx={{
                  color: "#F4DFC8",
                  textTransform: "uppercase",
                  "& .MuiTypography-root": {
                    fontWeight: "bold",
                    fontSize: 14,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidenav;
