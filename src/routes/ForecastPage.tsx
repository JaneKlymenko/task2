import React, { useEffect } from 'react';
import Forecast from '../components/Forecast';
import useDetailedForecast from '../hooks/useDetailedForecast';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

interface ForecastPageProps {}

const ForecastPage: React.FC<ForecastPageProps> = () => {
  const { city } = useParams<{ city: string }>();
  const { forecast, getWeatherData } = useDetailedForecast();

  useEffect(() => {
    if (city) {
      getWeatherData(city);
    }
  }, [city, getWeatherData]);

  return (
    <Container component="main" maxWidth="md">
      {city ? (
        <Typography component="h1" variant="h5" sx={{ mt: 6, mb: 4 }}>
            Детальний прогноз у {city}
        </Typography>
      ) : (
        <Typography component="h1" variant="h5" sx={{ mt: 6, mb: 4 }}>
            Вибачте, щось пішло не так... Перевірте правильність міста або повторіть спробу пізніше
        </Typography>
      )}
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContant: 'center',
          marginBottom: 6
        }}
      >
        {forecast && <Forecast data={forecast} />}
      </Box>
    </Container>
  );
};

export default ForecastPage;
