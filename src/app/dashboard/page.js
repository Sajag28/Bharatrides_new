"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Grid,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  CssBaseline,
  Container,
  CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {useRouter} from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});
const drawerWidth = 260;

export default function Dashboard() {
  const router= useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
  const [url,setUrl]=React.useState('')
  const [username, setUsername] = useState(''); // Default 
  const [phoneNumber, setPhoneNumber] = useState(''); 
   const [address, setAddress] = useState(''); 
 
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(''); // Default email
  useEffect(() => {
  if (typeof window !== 'undefined') {
    const userEmail = sessionStorage.getItem('email');
    if (userEmail && userEmail !== '') {
      setEmail(userEmail);
    } else {
      setEmail('sajag@gmail.com');
    }
  }
}, []);
useEffect(()=>{
  if(email){
    axios.get(`http://localhost:8000/used-cars/user-image/${email}`)
    .then((res)=>{
      setUrl(res.data.image_url);
    })
  }
},[email]);

useEffect(() => {
  if(email){
    axios.get(`http://localhost:8000/used-cars/user-profile/${email}`).then((res)=>{
      setUsername(res.data.username);
      setPhoneNumber(res.data.phone_number);
      setAddress(res.data.address);
      
    })
  }
},[email]);

  useEffect(() => {
    
    // Get email from sessionStorage
     
   if (email) {
    axios.get(`http://127.0.0.1:8000/used-cars/cars-by-user/${email}`)
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
        setLoading(false);
      });
  }
  }, [email]);
  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>User Info</Typography>
      <List>
        <ListItem><ListItemText primary="Name" secondary={username} /></ListItem>
        <ListItem><ListItemText primary="Phone Number" secondary={phoneNumber} /></ListItem>
        <ListItem><ListItemText primary="Address" secondary={address} /></ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Drawer */}
      <Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
        {isSmUp ? (
          <Drawer
            variant="permanent"
            open
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        {/* Topbar */}
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)`, backgroundColor:'#1769aa'}, ml: { sm: `${drawerWidth}px` } }} color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isSmUp && (
                <IconButton onClick={handleDrawerToggle} edge="start" color="inherit">
                  <MenuIcon />
                </IconButton>
              )}
              <img src="/bh_text_clipped.png" height="60px" width="150px" style={{borderRadius:"20px",marginTop:"1px"}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={`http://localhost:8000${url}`} alt="user" sx={{ width: 40, height: 40 }} />
              <Box>
                <Button sx={{color:'#fafafa'}} onClick={handleMenuClick}>{email} ▾</Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Toolbar />
        <Container sx={{ py: 3 }}>
          <ThemeProvider theme={theme}>
 

         

  
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    
  }}
>
  {/* New Car */}
 <Card sx={{ maxWidth: 700 }} onClick={() => router.push('/newcar')}>
      
      <CardContent>
        <DotLottieReact
      src="https://lottie.host/dd5bb5a3-9329-4fa9-8800-376853d85299/8BtzU9tKaI.lottie"
      loop
      autoplay
    />
      </CardContent>
      
    </Card>
</Stack>
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 4,
    
  }}
>

  
<Card sx={{ maxWidth: 700 }} onClick={() => router.push('/old')}>


<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <div style={{height:"100%" ,width:"100%"}}>
 {/* Used Car */}
 <img src="/used_car.png" style={{padding:'auto'}} height="300px" width="300px"/>
 </div>
</Stack>


</Card>


</Stack>



          </ThemeProvider>
          <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center"}}>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Cars You Listed So Far
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : cars.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No cars uploaded yet.
          </Typography>
        ) : (
          <Stack direction="column" sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={3}>
            {cars.map((car) => (
              <Card key={car.id} sx={{ width: '50%', borderRadius: 3 }}>
                

                <CardContent style={{cursor:'pointer'}}onClick={()=>{router.push('/cars')}}>
                  <Typography variant="h6" gutterBottom >
                    {car.title} 
                  </Typography>

                  
                 

                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Stack>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Card style={{width:"50%"}} sx={{ maxWidth: 700 }} onClick={() => router.push('/upload')}>
    <CardContent>
      <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
     <img src="/vehicle_sell.jpg" width="100%" height="100%"/>
     </Stack>
    </CardContent>
  </Card>
  <Card style={{width:"50%"}} sx={{ maxWidth: 700 }} onClick={() => router.push('/inspection')}>
    <CardContent>
      <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
     <img src="/car_inspection.png" width="100%" height="100%"/>
     </Stack>
    </CardContent>
  </Card>
</Stack>
        </Container>

        {/* Footer */}
        <Box textAlign="center" py={2} borderTop={1} borderColor="divider">
          <Typography variant="body2" color="text.secondary">
            &copy; 2025 Bharat Rides. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>

  );
}
