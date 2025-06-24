// 
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
import Grid from '@mui/material/Grid';
import Vantabackground from '@/comp/Vantabackground'; 
const transmissionTypes = ['Manual', 'Automatic'];
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'EV'];
const driveTrains = ['FWD', 'RWD', 'AWD'];
const bodyStyles = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Coupe'];
const engineTypes = ['Inline-4', 'Inline-6', 'V6', 'V8', 'Electric'];
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
export default function NewCarPreferenceForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form Data:', formData);
    // Call ML model or API here
  };

  return (
    <>
    
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', py: 6, px: 2 }}>

      <Card sx={{ maxWidth: 800, mx: 'auto', p: 3, boxShadow: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Select Your Preferences
        </Typography>
        <form onSubmit={handleSubmit}>
          <CardContent>
             
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

              {/* Transmission Type */}
             
                <FormControl fullWidth required>
                  <InputLabel>Transmission</InputLabel>
                  <Select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    label="Transmission"
                  >
                    {transmissionTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              

              {/* Fuel Type */}
              
                <FormControl fullWidth required>
                  <InputLabel>Fuel Type</InputLabel>
                  <Select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    label="Fuel Type"
                  >
                    {fuelTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              

              {/* Drive Train */}
             
                <FormControl fullWidth required>
                  <InputLabel>Drive Train</InputLabel>
                  <Select
                    name="driveTrain"
                    value={formData.driveTrain}
                    onChange={handleChange}
                    label="Drive Train"
                  >
                    {driveTrains.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              

              {/* Body Style */}
            
                <FormControl fullWidth required>
                  <InputLabel>Body Style</InputLabel>
                  <Select
                    name="bodyStyle"
                    value={formData.bodyStyle}
                    onChange={handleChange}
                    label="Body Style"
                  >
                    {bodyStyles.map((style) => (
                      <MenuItem key={style} value={style}>{style}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
             

              {/* City Mileage */}
              
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="cityMileage"
                  label="Min City Mileage (km/l)"
                  value={formData.cityMileage}
                  onChange={handleChange}
                />
           

              {/* Highway Mileage */}
             
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="highwayMileage"
                  label="Min Highway Mileage (km/l)"
                  value={formData.highwayMileage}
                  onChange={handleChange}
                />
           

              {/* Price Range */}
              
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="minPrice"
                  label="Min Price (in lakhs)"
                  helperText="Example: 12.5 = ₹12.5L"
                  value={formData.minPrice}
                  onChange={handleChange}
                />
            
             
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="maxPrice"
                  label="Max Price (in lakhs)"
                  helperText="Example: 125 = ₹1.25Cr"
                  value={formData.maxPrice}
                  onChange={handleChange}
                />
             

              {/* Engine Type (Optional) */}
            
                <FormControl fullWidth>
                  <InputLabel>Engine Type (Optional)</InputLabel>
                  <Select
                    name="engineType"
                    value={formData.engineType}
                    onChange={handleChange}
                    label="Engine Type"
                  >
                    {engineTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
             

              {/* Engine CC Range */}
             
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="minEngineCC"
                  label="Min Engine CC"
                  value={formData.minEngineCC}
                  onChange={handleChange}
                />
             
             
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="maxEngineCC"
                  label="Max Engine CC"
                  value={formData.maxEngineCC}
                  onChange={handleChange}
                />
              

              {/* Submit Button */}
            
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  Find My Car
                </Button>
              </Stack>
            
          </CardContent>
        </form>
      </Card>
    </Box>
    
    </>
  );
}