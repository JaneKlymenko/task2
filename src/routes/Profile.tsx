import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import WeatherComponent from '../components/WeatherComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useForecast from '../hooks/useForecast';
import Forecast from '../components/Forecast';
import WeatherCard from '../components/WeatherCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import 'firebase/firestore';
import {writeFavCity, readFavCity, deleteFavCity} from '../firebase/useFirebase';
import AlertDialog from '../components/Alert';

const defaultTheme = createTheme();

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [favCities, setFavCities] = useState<string[]>([]);
  const {
    forecast,
    options,
    city,
    onOptionSelect,
    getWeatherData,
    handleCityChange,
   } = useForecast();


  useEffect(() => {
    const fetchFavCities = async () => {
      if (currentUser) {
        const cities = await readFavCity(currentUser.uid);
        setFavCities(cities);
      }
    };
    fetchFavCities();
  }, [currentUser]);

  const updateAllCards = async () => {
    if (currentUser) {
      const cities = await readFavCity(currentUser.uid);
      setFavCities(cities);
    }
  };
  
  const handleCityAdd = async () => {
    if (currentUser) {
      await writeFavCity(currentUser.uid, city);
      updateAllCards();
      setOpen(true);
    }
  };


  return(
    <ThemeProvider theme={defaultTheme}>
      
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div>
      <h3>Привіт, {currentUser?.email}!</h3>
    </div>

      <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 6
          }}
        >
          {forecast ? (
             <>
              <Button variant="contained" color="primary" onClick={() => { handleCityAdd()}}>
                Додати до улюблених
              </Button>
              <AlertDialog open={open} handleClose={() => setOpen(false)} />
              <Forecast data={forecast} />
             </>
             
            )
            :(<WeatherComponent 
            city={city} 
            options={options} 
            handleCityChange={handleCityChange}
            onOptionSelect={onOptionSelect} 
            getWeatherData={getWeatherData}
          />)
          
          }
        </Box>
      </Container>
      <Container component="main" maxWidth="md" >
        
      <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
        {favCities.map((city:string, index:number) => (
          <Grid item xs={6} md={4} key={index}>
            <WeatherCard city={city} updateAllCards={updateAllCards}></WeatherCard>
          </Grid>
        ))}
          
      </Grid>

      </Container>
    </ThemeProvider>
  )
}
export default Profile
