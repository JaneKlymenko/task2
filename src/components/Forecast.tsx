import Degree from './Degree'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Tile from './Tile'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {
  getHumidityValue,
  getWindDirection,
  getVisibilityValue,
  getSunTime,
  getPop,
} from '../helpers/index'

import { forecastType } from '../types/types'

type Props = {
  data: forecastType
}

const Forecast = ({ data }: Props) => {
  const today = data.list[0]

  return (
    <Container
    sx={{
      marginTop: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContant: 'center',
      marginBottom: 4
    }}
    >
      <Box
        bgcolor="rgba(255, 255, 255, 0.2)"
        sx={{ 
          backdropFilter: 'blur(5px)', 
          borderRadius: 3, 
          boxShadow: 4, 
          maxWidth: 600,
          padding: 2,
          width: '100%',
          boxSizing: 'border-box'
         }}
        >

          {/* HEADER OF CARD */}
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold">
              {data.name} <Typography variant="inherit" fontWeight="thin">{data.country}</Typography>
          </Typography>
          <Typography variant="h3" fontWeight="extrabold">
              <Degree temp={Math.round(today.main.temp)} />
          </Typography>
          <Typography variant="body1" fontSize="small">
              {today.weather[0].main} ({today.weather[0].description})
          </Typography>
          <Typography variant="body1" fontSize="small">
              H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
              <Degree temp={Math.floor(today.main.temp_min)} />
          </Typography>
        </Box>

          {/* MAIN INFO */}
        <Box display="flex" overflow="auto" sx={{ margin: 2}}>
          {data.list.map((item, i) => (
            <Box key={i} textAlign="center" minWidth="50px" flexShrink={0} className="inline-block">
              <Typography variant="body2" fontSize="small">
                {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
              </Typography>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <Typography variant="body2" fontWeight="bold" fontSize="small">
                <Degree temp={Math.round(item.main.temp)} />
              </Typography>
            </Box>
          ))}
        </Box>

      {/* ALL INFO */}
      <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
        <Grid item xs={6} sx={{ boxSizing: 'border-box'}}>
           <Sunrise /> <span className="mt-2">{getSunTime(data.sunrise)}</span>
        </Grid>
        <Grid item xs={6} sx={{ boxSizing: 'border-box'}}>
            <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
        </Grid>
        <Grid item xs={12} md={6} sx={{ boxSizing: 'border-box'}}>
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts 
            ${today.wind.gust.toFixed(1)} km/h`}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ boxSizing: 'border-box'}}>
          <Tile
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ boxSizing: 'border-box'}}>
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ boxSizing: 'border-box'}}>
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop * 100)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ boxSizing: 'border-box'}}>
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={` ${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ boxSizing: 'border-box'}}>
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </Grid>

        </Grid>
      </Box>
    </Container>
  )
}

export default Forecast