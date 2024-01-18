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
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useUser } from '../Utils/UserContext';

const drawerWidth = 340;

function Sidenav() {  
  const {fetchUserData} = useUser();    

  const handleLogout = () => {    
    sessionStorage.removeItem('token');    
    fetchUserData(null);
  }  

  return (    
    <>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
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
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>        
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <button onClick={handleLogout}>
                  Log Out
                </button>
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>        
      </List>
    </Drawer>    
    </>  
  );
}

export default Sidenav;