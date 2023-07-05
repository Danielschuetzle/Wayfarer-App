import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  margin-top: 20px;
`;

const WeatherTitle = styled.h2`
  color: #3f72af;
  font-size: 18px;
  margin-bottom: 10px;
`;

const WeatherItem = styled.div`
  margin-bottom: 10px;
`;

const WeatherForecast = ({ location, startDate, endDate }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.NEXT_PUBLIC_WEATHER_API}&city=${location}&start_date=${startDate}&end_date=${endDate}`
        );
        const data = await response.json();
        setForecastData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    fetchWeatherForecast();
  }, [location, startDate, endDate]);

  if (loading) {
    return <p>Loading weather forecast...</p>;
  }

  if (!forecastData) {
    return <p>Unable to fetch weather forecast.</p>;
  }

  const startDayForecast = forecastData.data[0];

  return (
    <WeatherContainer>
      <WeatherTitle>Weather Forecast</WeatherTitle>
      <WeatherItem>
        <p>Date: {startDayForecast.valid_date}</p>
        <p>Temperature: {startDayForecast.temp}°C</p>
        <p>Weather Description: {startDayForecast.weather.description}</p>
      </WeatherItem>
    </WeatherContainer>
  );
};

export default WeatherForecast;
