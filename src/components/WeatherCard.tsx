import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import Degree from '../components/Degree';
import { useNavigate } from 'react-router-dom'; 
import {deleteFavCity} from '../firebase/useFirebase';

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
  weather: [
    {
      main: string
      icon: string
      description: string
    }
  ]
}

type WeatherCardProps = {
  city: string;
  updateAllCards: () => Promise<void>;
}

const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherCard: React.FC<WeatherCardProps> = ({ city, updateAllCards }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext)

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  const handleRefresh = () => {
    fetchData();
  };

  const handleOpenForecast = () => {
    if (weatherData) {
      console.log('City:', city);
      navigate(`/forecast/${encodeURIComponent(city)}`);
    }
  };


  const handleCityDelete = async () => {
    if (currentUser) {
      await deleteFavCity(currentUser.uid, city);
      if (updateAllCards) {
        await updateAllCards();
      }
    }
  };
  
  return (
    <Card sx={{ height: 300, position: 'relative'}}>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCityDelete}
        aria-label="close"
        sx={
          {
            position: 'absolute',
            top: '8px',
            right: '10px',
            zIndex: 2,
          }
        }
      >
        <CloseIcon />
      </IconButton>
      {loading ? (
        <CircularProgress />
      ) : (
        <CardActionArea onClick={handleOpenForecast}>
          <CardMedia
            component="img"
            height="100"
            alt={`weather-icon-${weatherData?.weather[0].description}`}
            src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
            sx={{
              margin: 1,
              objectFit: "none",
            }}
          />

          <CardContent>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                {weatherData?.name}
              </Typography>
              <Typography variant="h4" fontWeight="extrabold">
                <Degree temp={Math.round(weatherData?.main.temp || 0)} />
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      )}
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={handleRefresh}
      >
        Оновити зараз
      </Button>

    </Card>
  );
}

export default WeatherCard;
