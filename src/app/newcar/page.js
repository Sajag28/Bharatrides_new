'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const transmissionTypes = ['Manual', 'Automatic'];
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'EV'];
const driveTrains = ['FWD', 'RWD', 'AWD'];
const bodyStyles = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Coupe'];
const engineTypes = ['Inline-4', 'Inline-6', 'V6', 'V8', 'Electric'];

export default function NewCarPreferenceForm() {
  const email= sessionStorage.getItem('email');
  const [recommendedCars, setRecommendedCars] = useState([]);

  const [formData, setFormData] = useState({
    transmission: '',
    fuelType: '',
    driveTrain: '',
    bodyStyle: '',
    cityMileage: '',
    highwayMileage: '',
    minPrice: '',
    maxPrice: '',
    engineType: '',
    minEngineCC: '',
    maxEngineCC: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/new-cars/api/recommend/', {
        transmission: formData.transmission,
        fuel_type: formData.fuelType,
        drivetrain: formData.driveTrain,
        body_style: formData.bodyStyle,
        min_city_mpg: Number(formData.cityMileage),
        min_highway_mpg: Number(formData.highwayMileage),
        min_price: Number(formData.minPrice) * 100000,
        max_price: Number(formData.maxPrice) * 100000,
        min_engine_cc: Number(formData.minEngineCC),
        max_engine_cc: Number(formData.maxEngineCC),
        top_n: 10
      });

      console.log("Recommended Cars:", response.data);
      setRecommendedCars(response.data);
      // You can route or show them in a card now.
    } catch (error) {
      console.error("Error fetching car recommendations:", error);
    }
  };

  return (
    <>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  
  <img src="/new_car.jpg" height="30%" width="60%"/>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

  <Typography variant="h4">Confusion about which car to purchase? </Typography>
  <Typography variant="h4">Use our predictor to get the best suggestions on your need</Typography>
  </Stack>
</Stack>

    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', py: 6, px: 2 }}>
      <Card sx={{ maxWidth: 800, mx: 'auto', p: 3, boxShadow: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Select Your Preferences
        </Typography>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
              <FormControl fullWidth required>
                <InputLabel>Transmission</InputLabel>
                <Select name="transmission" value={formData.transmission} onChange={handleChange} label="Transmission">
                  {transmissionTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Fuel Type</InputLabel>
                <Select name="fuelType" value={formData.fuelType} onChange={handleChange} label="Fuel Type">
                  {fuelTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Drive Train</InputLabel>
                <Select name="driveTrain" value={formData.driveTrain} onChange={handleChange} label="Drive Train">
                  {driveTrains.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Body Style</InputLabel>
                <Select name="bodyStyle" value={formData.bodyStyle} onChange={handleChange} label="Body Style">
                  {bodyStyles.map((style) => <MenuItem key={style} value={style}>{style}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField required fullWidth type="number" name="cityMileage" label="Min City Mileage (km/l)" value={formData.cityMileage} onChange={handleChange} />
              <TextField required fullWidth type="number" name="highwayMileage" label="Min Highway Mileage (km/l)" value={formData.highwayMileage} onChange={handleChange} />
              <TextField required fullWidth type="number" name="minPrice" label="Min Price (in lakhs)" value={formData.minPrice} onChange={handleChange} helperText="Example: 12.5 = ₹12.5L" />
              <TextField required fullWidth type="number" name="maxPrice" label="Max Price (in lakhs)" value={formData.maxPrice} onChange={handleChange} helperText="Example: 125 = ₹1.25Cr" />
              <FormControl fullWidth>
                <InputLabel>Engine Type (Optional)</InputLabel>
                <Select name="engineType" value={formData.engineType} onChange={handleChange} label="Engine Type">
                  {engineTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField required fullWidth type="number" name="minEngineCC" label="Min Engine CC" value={formData.minEngineCC} onChange={handleChange} />
              <TextField required fullWidth type="number" name="maxEngineCC" label="Max Engine CC" value={formData.maxEngineCC} onChange={handleChange} />
              <Button fullWidth variant="contained" color="primary" type="submit" size="large">Find My Car</Button>
            </Stack>
          </CardContent>
        </form>
      </Card>
    </Box>
  
    {recommendedCars.length > 0 && (
  <Box sx={{ mt: 6 }}>
    <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
      Recommended Cars
    </Typography>
    <Stack direction="column" spacing={3} alignItems="center">
      {recommendedCars.map((car, index) => (
        <Card key={index} sx={{ width: '50%', maxWidth: 800,textAlign:'center' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {car.make} {car.model} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Engine: {car.engine_cc} cc | Fuel: {car.fuel_type} | Transmission: {car.transmission}<br/>
              Drivetrain: {car.drivetrain} | Body: {car.body_style} | Seating: {car.seating_capacity}<br/>
              City Mileage: {car.city_mpg} km/l | Highway Mileage: {car.highway_mpg} km/l
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Actual Price: ₹{(car["price (in lakhs)"] * 100000).toLocaleString()} <br/>
              Predicted Price: ₹{(car.predicted_price * 100000).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  </Box>
    )}
    
    </>
  );
}
