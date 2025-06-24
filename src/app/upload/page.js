'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import './upload.css'; 
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});
theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '2.2rem',
  },
  '@media (min-width:900px)': {
    fontSize: '3.5rem',
  },
};
theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '2.2rem',
  },
  '@media (min-width:900px)': {
    fontSize: '3.5rem',
  },
};
export default function UploadPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    title: '',
    description: '',
    price: '',
    brand: '',
    model: '',
    variant: '',
    car_no:'',
    year: '',
    fuel_type: '',
    transmission: '',
    engine_capacity: '',
    mileage: '',
    km_driven: 0,
    number_of_owners: '',
    insurance_validity: '',
    rc_available: '',
    city:'',
    state: '',
    pincode: '',
  });


  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length > 10) {
      alert('You can only upload up to 10 images.');
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    images.forEach((image) => payload.append('images', image));

    try {
      const res = await axios.post('http://127.0.0.1:8000/used-cars/upload-car/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Car uploaded successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Something went wrong!');
    }
  };

  return (
<div style={{
      backgroundColor: '#87CEEB', // light grey background
      minHeight: '100vh',
      width: '100%',
    }}>
<div style={{
  backgroundImage: `url('/blue_back.jpg')`, // path to image in public folder
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',   // ensures full viewport height
    width: '100%',
}}>
  
<Stack
  direction="column"
  spacing={0}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "flex-start",
    
  }}
>
<div style={{ width: '90vw', height: '80vh' ,marginTop:'0vh'}}>
<img src="/car1.jpg" width="70%" height="80%"/>
</div>
</Stack>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    ml:5
  }}
>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "flex-start",
  }}
>
  <Typography variant="h2">Want to sell your old car?</Typography>
  <Typography variant="h3">List it in our engine to get best deals</Typography>

</Stack>
<img src="/handshake.png" width="20%" height="20%"/>
</Stack>
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-end",
    alignItems: "center",
    mt:10
  }}
>
    <img src="/bharatrides.jpg" width="20%" height="20%" style={{ borderRadius: '12px' }} />
    <Container maxWidth="md" sx={{ mb: 3,opacity:0.7 }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 5 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Upload Car Details
              </Typography>
              <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid container spacing={3}>
                  {[
                    ['username', 'Username'], ['email', 'Email', 'email'], ['password', 'Password', 'password'],
                    ['title', 'Car Title'], ['description', 'Description', 'textarea'], ['price', 'Price (INR)', 'number'],
                    ['brand', 'Brand'], ['model', 'Model'], ['variant', 'Variant'], ['car_no','Car No.','text'],['year', 'Manufacturing Year', 'number'],
                    ['fuel_type', 'Fuel Type'], ['transmission', 'Transmission Type'],
                    ['engine_capacity', 'Engine Capacity (cc)', 'number'],
                    ['mileage', 'Mileage (km/l)', 'number'], ['kilometers_driven', 'Kilometers Driven', 'number'],
                    ['number_of_owners', 'Number of Owners', 'number'],
                    ['insurance_validity', 'Insurance Validity (YYYY-MM-DD)', 'date'],
                    ['rc_available', 'RC Available (Yes/No)', 'text'],['city','City', 'text'], ['state', 'State', 'text'], ['pincode', 'Pincode', 'text']
                  ].map(([name, label, type = 'text']) => (
                    <Grid item xs={12} sm={name === 'description' ? 12 : 6} key={name}>
                      <TextField
                        fullWidth
                        name={name}
                        label={label}
                        type={type}
                        value={formData[name]}
                        onChange={handleInputChange}
                        required={name !== 'variant'} // you can adjust required fields
                        multiline={name === 'description'}
                        rows={name === 'description' ? 3 : undefined}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Button variant="outlined" component="label" fullWidth>
                      Upload Images (Max 10)
                      <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
    </Container>
    </Stack>
    
    </Stack>
    </div>
    </div>
  );
}
