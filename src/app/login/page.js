'use client';

import { useState } from 'react';
import { loginUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Vantabackground from '@/comp/Vantabackground'; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});


export default function SignupPage() {
 
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();
   const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      await loginUser(email, password);
      sessionStorage.setItem('email', email); // Store email in session storage
      alert('Login successful!');
      router.push('/dashboard'); // or directly to /dashboard
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <>
    <main style={{ position: 'absolute', height: '100vh', width: '100vw',overflowX:'auto' }}>
      <Vantabackground />
    <ThemeProvider theme={theme}>

<Stack
  direction="column"
  spacing={0}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 2
  }}
>
{/* <Image src="/bharatrides.jpg" alt="My Photo" width={400} height={400}/> */}
<div style={{ width: '45vw', height: '40vh' }}>
      <img
        src="/bharatrides.jpg"
        alt="Responsive"
        style={{ width: '100%', height: '90%', objectFit: 'cover' }}
      />
    </div>
<div style={{ width: '60vw', height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
<Box sx={{ minWidth: 400 ,width:"70%"}}>
      <Card variant="outlined">
       <React.Fragment>
    <CardContent>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
<DotLottieReact
      src="https://lottie.host/89d98f39-4298-4a40-8f24-7f51f53664a8/GDmT1lrHn0.lottie"
      loop
      autoplay
    />
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
<Typography variant="h6">Login into our portal</Typography>
 <TextField
        required
        id="input-with-icon-textfield"
        label="Email ID"
        onChange={event => setEmail(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
        variant="standard"
      />

<FormControl fullWidth required sx={{ m: 1, width: '25ch' }} variant="standard">
          
          <InputLabel htmlFor="standard-adornment-password">Enter Password</InputLabel>
          <Input

            
            id="standard-adornment-password"
            onChange={e=> {setPassword(e.target.value)}}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        
        </FormControl>
        <Link href="/signup">New to our portal? Signup here now!</Link>
        <Button variant="outlined" onClick={handleLogin}>Login In</Button>
</Stack>
</Stack>
    </CardContent>
   
  </React.Fragment>

      </Card>
    </Box>
 </div>   
</Stack>

    {/* <form onSubmit={handleSignup} style={{ maxWidth: 400, margin: 'auto', padding: '1rem' }}>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br />
      <button type="submit">Sign Up</button>
    </form> */}
    </ThemeProvider>
    </main>
    </>
  );
}
