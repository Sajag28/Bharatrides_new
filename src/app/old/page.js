'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {React,useState} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Box, InputBase, Paper, IconButton,TextField,
  Button,
  Card,
  CardMedia,
  CardContent} from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function old() {
    const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // const handleSearch = async () => {
  //   if (!query.trim()) return;

  //   try {
  //     const res = await axios.post('http://127.0.0.1:8000/used-cars/search-cars/', { query });
  //     setResults(res.data);
  //   } catch (err) {
  //     console.error('Search failed:', err);
  //   }
  // };
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-start",
    alignItems: "center",
    ml:4,
    mt:2
  }}
>
<img src="/bharatrides.jpg" height="10%" width="10%"/>
</Stack>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    ml:4,
    mt:4
  }}
>
    <Typography variant="h2">Want to get a car in your budget?</Typography>
    {/* <div style={{width:'30vw', height:'44vh'}}>
    <img src="/budget.png" height="100%" width="100%"/>
    </div> */}
     <DotLottieReact
      src="https://lottie.host/4e5aca6c-f679-444c-af05-189491438a8f/PgVPN80KDi.lottie"
      loop
      autoplay
    />
</Stack>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 4,
  }}
>
    <Typography variant="h3">We have a wide range of used cars among these</Typography>

</Stack>
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 4,
  }}
>
     <DotLottieReact
      src="https://lottie.host/1267e426-0dec-4179-b55d-3eb0891182fb/KAmeg8SmVC.lottie"
      loop
      autoplay
      style={{ width: '30vw', height: '30vh' }}
    />
</Stack>
<div style={{
  backgroundImage: `url('/brown_back.jpg')`,  // Place image in /public folder
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%'
  
  
}}>
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-start",
    alignItems: "center",
    mt: 2,
  }}
>
<div style={{width:'70vw', height:'50vh'}}>
<img src="/display1.png" height="100%" width="100%"/>
</div>
</Stack>
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",
    mt: 2,
  }}
>
    <div style={{width:'30vw', height:'40vh'}}>
       <img src="/display3.png" height="100%" width="100%"/>
    </div>
    
    <div style={{width:'30vw', height:'40vh'}}>
       <img src="/display5.png" height="100%" width="100%"/>
    </div>
</Stack>
<Stack
  direction="row"
  spacing={0}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 2,
  }}
>
<div style={{width:'42vw', height:'40vh'}}>
       <img src="/display4.png" height="100%" width="100%"/>
    </div>
    {/* <DotLottieReact
      src="https://lottie.host/3a81acce-0688-4523-9971-a3f5d8b980b6/UgwzGO6HOk.lottie"
      loop
      autoplay
    /> */}
</Stack>
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",

  }}
>
<div style={{width:'35vw', height:'35vh'}}>
       <img src="/display6.png" height="100%" width="100%"/>
    </div>


<div style={{width:'40vw', height:'42vh'}}>
       <img src="/display7.png" height="100%" width="100%"/>
    </div>
</Stack>
</div>
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",

  }}
>
    <Typography variant="h3">And Many More...</Typography>
</Stack>
<Stack
  direction="row"
  spacing={0}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",
    mt:5
  }}
>
     <DotLottieReact
      src="https://lottie.host/1b368e4f-d001-4cc5-ac9a-bd4de2a6d753/1E0hoKQlw8.lottie"
      loop
      autoplay
      style={{ width: '50vw', height: '50vh' }}
    />
    <Typography variant="h3">And that too all the Users are Verified!!!</Typography>
</Stack>

<Stack
  direction="row"
  spacing={0}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
 <DotLottieReact
      src="https://lottie.host/3a81acce-0688-4523-9971-a3f5d8b980b6/UgwzGO6HOk.lottie"
      loop
      autoplay
      style={{ width: '40vw', height: '40vh' }}
    />
 {/* <Box sx={{ p: 4, textAlign: 'center' }}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mb={3}>
        <TextField
          label="Search Cars by Title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="outlined"
          sx={{ width: '300px' }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack>
</Box> */}
<Paper
  component="form"
  onSubmit={async(e) => {
    e.preventDefault();
    const inputValue = e.target.search.value.trim();
    if (inputValue) {
      console.log("Search value:", inputValue); // You can trigger your filter logic or API here
    }
    if (!inputValue.trim()) return;

    try {
      const res = await axios.post('http://127.0.0.1:8000/used-cars/search-cars/', { query: inputValue });
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }}
  sx={{
    p: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    borderRadius: 3,
    boxShadow: 3,
    mx: 'auto',
    mt: 4,
    mb: 4,
    backgroundColor: 'white',
  }}
>
  <InputBase
    sx={{ ml: 1, flex: 1 }}
    placeholder="Search cars, brands, models..."
    name="search"
    inputProps={{ 'aria-label': 'search cars' }}
  />
  <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
    <SearchIcon />
  </IconButton>
</Paper>
</Stack>
      <Stack spacing={3} alignItems="center">
        {results.map((car) => (
          <Card key={car.id} sx={{ width: '80%', borderRadius: 3 }}>
            {car.images && car.images.length > 0 && (
              <Box sx={{ display: 'flex', overflowX: 'auto', p: 2 }}>
                {car.images.map((img, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    image={`http://localhost:8000${img}`}
                    alt={`Car Image ${index + 1}`}
                    sx={{ height: 200, width: 300, mr: 2, borderRadius: 2 }}
                  />
                ))}
              </Box>
            )}
            <CardContent>
              <Typography variant="h5" gutterBottom>{car.title} — ₹{car.price}</Typography>
              <Typography variant="body2" paragraph>{car.description}</Typography>
              <Typography><strong>Brand:</strong> {car.brand}</Typography>
              <Typography><strong>Year:</strong> {car.year_of_manufacture}</Typography>
              <Typography><strong>Fuel:</strong> {car.fuel_type}</Typography>
              <Typography><strong>Transmission:</strong> {car.transmission}</Typography>
              <Typography><strong>Mileage:</strong> {car.mileage_kmpl} km/l</Typography>
              <Typography><strong>Driven:</strong> {car.km_driven} km</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    
</Stack>


      
    </ThemeProvider>
  );
}
