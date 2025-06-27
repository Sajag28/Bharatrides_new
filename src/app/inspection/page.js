// app/inspection-booking/page.js
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  Alert
} from '@mui/material';
import dayjs from 'dayjs';
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
export default function InspectionBookingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [slots, setSlots] = useState([]);
  const [city, setCity] = useState('');
  const [carId, setCarId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = dayjs();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      axios.get(`http://localhost:8000/used-cars/user-profile/?email=${storedEmail}`)
        .then(res => {
          setUsername(res.data.username);
        })
        .catch(err => console.error('Failed to load user profile:', err));
    }
  }, []);

  useEffect(() => {
    if (selectedDate && city) {
      axios.get('http://localhost:8000/used-cars/available-slots/', {
        params: { city, date: selectedDate }
      }).then(res => setSlots(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedDate, city]);

  const getDateByWeekday = (weekdayIndex) => {
    const todayIndex = today.day();
    const offset = ((weekdayIndex + 1) - todayIndex + 7) % 7;
    return today.add(offset, 'day').format('YYYY-MM-DD');
  };

  const handleBooking = () => {
    axios.post('http://localhost:8000/used-cars/book-inspection-slot/', {
      car_number: carId,
      city,
      date: selectedDate,
      time_slot_id: selectedTimeSlotId,
      username,
      email
    }, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(res => setMessage(res.data.message))
    .catch(err => setMessage(err.response?.data?.error || 'Booking failed.'));
  };

  return (
<>
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

    <img src="/car_inpect.png" height="50%" width="60%"/>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

    <Typography variant="h4">Not sure about your car quality? Schedule an inspection to know your call quality status</Typography>
    <img src="/today.png" height="150px" width="150px"/>
    <Typography variant="h5">Our Car Inspectors will be there and give you detailed quality check</Typography>
    </Stack>
    </Stack>
      </Stack>
  <div style={{backgroundColor: '#6CD2FE'}}>
  <div  style={{
    backgroundImage: `url("/blue_2.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    padding: '40px 0'
  }}>
    <Container>
      <Typography variant="h4" gutterBottom>
        Book Your Car Inspection Slot
      </Typography>

      <Box mb={2}>
        <TextField
          fullWidth
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Vehicle No"
          variant="outlined"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Typography variant="h6">Choose Day:</Typography>
      <Grid container spacing={2} mb={2}>
        {weekdays.map((day, index) => (
          <Grid item key={index}>
            <Button
              variant={selectedDate === getDateByWeekday(index) ? 'contained' : 'outlined'}
              onClick={() => setSelectedDate(getDateByWeekday(index))}
            >
              {day}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6">Choose Time Slot:</Typography>
      <Grid container spacing={2} mb={2}>
        {slots.map(slot => (
          <Grid item key={slot.id}>
            <Button
              variant={selectedTimeSlotId === slot.id ? 'contained' : 'outlined'}
              onClick={() => setSelectedTimeSlotId(slot.id)}
            >
              {slot.start_time} - {slot.end_time}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTimeSlotId || !city || !carId || !email || !username}
      >
        Book Slot
      </Button>

      {message && (
        <Box mt={3}>
          <Alert severity={message.includes('successfully') ? 'success' : 'error'}>
            {message}
          </Alert>
        </Box>
      )}
    </Container>
    </div>
    </div>
    </>
  );
}