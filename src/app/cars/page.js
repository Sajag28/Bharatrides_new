'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function CarsPage() {
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

  return (
    <div style={{
    backgroundImage: `url('/city_build.jpg')`,  // Place image in /public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '2rem 0'
  }}>
    <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Container sx={{ py: 6 ,opacity:0.8}}>
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
              <Card key={car.id} sx={{ width: '100%', borderRadius: 3 }}>
                {car.images && car.images.length > 0 && (
                  <Box sx={{ display: 'flex', overflowX: 'auto', p: 2 }}>
                    {car.images.map((imgObj, index) => (
                      <CardMedia
                        key={index}
                        component="img"
                        image={imgObj.image}
                        alt={`Car Image ${index + 1}`}
                        sx={{ height: 200, width: 300, mr: 2, borderRadius: 2 }}
                      />
                    ))}
                  </Box>
                )}

                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    {car.title} — ₹{car.price}
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
                    {car.description}
                  </Typography>
                 
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

                  <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{textAlign:'center'}}><strong>Brand:</strong> {car.brand}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Model:</strong> {car.model}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Variant:</strong> {car.variant || 'N/A'}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Manufacturing Year:</strong> {car.year}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Fuel Type:</strong> {car.fuel_type}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Transmission:</strong> {car.transmission}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{textAlign:'center'}}><strong>Engine Capacity:</strong> {car.engine_capacity} cc</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Mileage:</strong> {car.mileage} km/l</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Kilometers Driven:</strong> {car.kilometers_driven}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Owners:</strong> {car.number_of_owners}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>Insurance Validity:</strong> {car.insurance_validity}</Typography>
                      <Typography sx={{textAlign:'center'}}><strong>RC Available:</strong> {car.rc_available}</Typography>
                    </Grid>
                  </Grid>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Stack>
    </div>
  );
}
