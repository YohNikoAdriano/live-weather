import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'your_api_key_here'; // Ganti dengan API key Anda
  const LAT = -6.1751; // Ganti dengan latitude Anda
  const LON = 106.8650; // Ganti dengan longitude Anda

  useEffect(() => {
    // Mendapatkan Location Key berdasarkan Latitude dan Longitude
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${LAT},${LON}`)
      .then(response => {
        const locationKey = response.data.Key; // Ambil Location Key
        return axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
      })
      .then(response => {
        setWeatherData(response.data[0]);
      })
      .catch(err => {
        setError('Failed to fetch weather data', err);
      });
  }, [LAT, LON]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather Data</h1>
      <p>{weatherData.WeatherText}</p>
      <p>Temperature: {weatherData.Temperature.Metric.Value}°C</p>
      <p>Humidity: {weatherData.RelativeHumidity}%</p>
    </div>
  );
};

export default Weather;
