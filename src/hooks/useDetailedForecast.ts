import { useState, useEffect } from 'react';
import { forecastType } from './../types/types';

const API_KEY = process.env.REACT_APP_API_KEY;

const useDetailedForecast = () => {
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getWeatherData = (city: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };

        setForecast(forecastData);
      })
      .catch((e) => console.log({ e }));
  };

  return {
    forecast,
    getWeatherData,
  };
};

export default useDetailedForecast;
