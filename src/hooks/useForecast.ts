import { useState, useEffect, ChangeEvent } from 'react'
import { optionType, forecastType } from './../types/types'

const API_KEY = process.env.REACT_APP_API_KEY;

const useForecast = () => {
    const [city, setCity] = useState<string>('');
    const [chosenCity, setChosenCity] = useState<optionType | null>(null);
    const [options, setOptions] = useState<[]>([]);
    const [forecast, setForecast] = useState<forecastType | null>(null);

    const getSearchCity = (value:string) =>{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => setOptions(data))
    }

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setCity(value)

    if (value === "") return;

    getSearchCity(value)
    
    };

    const getForecast = (chosenCity: optionType) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${chosenCity.lat}&lon=${chosenCity.lon}&units={metric}&appid=${API_KEY}`
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        const forecastData = {
            ...data.city,
            list: data.list.
            slice(0, 16),
        }

        setForecast(forecastData)
        })
        .catch((e) => console.log({ e }))
    }

    const getWeatherData = () => {
        if (!chosenCity) return
        getForecast(chosenCity)
    }

    const onOptionSelect = (option: optionType) => {
    setChosenCity(option)

    }

    useEffect(() => {
    if(chosenCity){
        setCity(chosenCity.name)
        setOptions([])
    }

    }, [chosenCity])


    return {
        forecast,
        options,
        city,
        onOptionSelect,
        getWeatherData,
        handleCityChange,
    }
}

export default useForecast