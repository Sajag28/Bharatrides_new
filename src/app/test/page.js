'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Alert,
  Stack
} from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function Test() {
  const [user_email, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    aadhar_number: '',
    image: null,
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setError('');

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      const res = await fetch('http://localhost:8000/used-cars/register-user/', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage(`✅ ${data.message || 'User created successfully!'}`);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <div style={{
      backgroundImage: 'url(/blue_back.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100vw',
      height: 'auto',
    }}>
      <Stack direction="column" spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center" }}>
        <img src="/bharatrides.gif" width="90%" height="90%" style={{ borderRadius: '12px' }} />

        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" ,mb:2}}>
          <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4">Welcome {user_email}</Typography>
            <DotLottieReact
              src="https://lottie.host/ddce4a19-995a-4e06-904d-349b212c8154/xyKbDZv9VO.lottie"
              loop
              autoplay
             
            />
          </Stack>

          <Container maxWidth="sm" sx={{ mt: 3, opacity: 0.8 }}>
            <Paper elevation={3} sx={{ p: 6, borderRadius: 3 }}>
              <div>
                <Typography variant="h5" component="h1" gutterBottom>
                  To get started kindly fill the details below
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                  <Grid container spacing={2}>
                    {[
                      { name: 'username', label: 'Username' },
                      { name: 'email', label: 'Email', type: 'email' },
                      { name: 'password', label: 'Password', type: 'password' },
                      { name: 'phone_number', label: 'Phone Number' },
                      { name: 'address', label: 'Address' },
                      { name: 'aadhar_number', label: 'Aadhar Number' }
                    ].map(({ name, label, type = 'text' }) => (
                      <Grid item xs={12} key={name}>
                        <TextField
                          fullWidth
                          name={name}
                          label={label}
                          type={type}
                          variant="outlined"
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <Button variant="outlined" component="label" fullWidth>
                        Upload Image
                        <input
                          type="file"
                          name="image"
                          hidden
                          accept="image/*"
                          onChange={handleChange}
                          required
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" fullWidth>
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </div>

              {responseMessage && (
                <Alert severity="success" sx={{ mt: 3 }}>
                  {responseMessage}
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  {error}
                </Alert>
              )}
            </Paper>
          </Container>
        </Stack>
      </Stack>
    </div>
  );
}
