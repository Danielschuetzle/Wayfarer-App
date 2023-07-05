import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  margin-top: 20px;
`;

const WeatherTitle = styled.h2`
  color: #3f72af;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

const WeatherInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const WeatherInfoTitle = styled.p`
  font-weight: bold;
  margin-right: 10px;
  text-align: center;

`;

const WeatherInfo = styled.p`
  font-weight: light;
`;

const WeatherForecast = ({ location, startDate, endDate }) => {
  const [startDayForecast, setStartDayForecast] = useState(null);
  const [endDayForecast, setEndDayForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.NEXT_PUBLIC_WEATHER_API}&city=${location}&start_date=${startDate}&end_date=${endDate}`
        );
        const data = await response.json();
        setStartDayForecast(data.data[0]);
        setEndDayForecast(data.data[data.data.length - 1]);
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

  if (!startDayForecast || !endDayForecast) {
    return <p>Unable to fetch weather forecast.</p>;
  }

  return (
    <WeatherContainer>
      <WeatherTitle>Weather Forecast</WeatherTitle>
      <WeatherInfoBox>
        <WeatherInfoTitle>Start Date:</WeatherInfoTitle>
        <WeatherInfo>{startDayForecast.valid_date}</WeatherInfo>
      </WeatherInfoBox>
      <WeatherInfoBox>
        <WeatherInfoTitle>Temperature:</WeatherInfoTitle>
        <WeatherInfo>{startDayForecast.temp}°C</WeatherInfo>
      </WeatherInfoBox>
      <WeatherInfoBox>
        <WeatherInfoTitle>Weather:</WeatherInfoTitle>
        <WeatherInfo>{startDayForecast.weather.description}</WeatherInfo>
      </WeatherInfoBox>
      <WeatherInfoBox>
        <WeatherInfoTitle>End Date:</WeatherInfoTitle>
        <WeatherInfo>{endDayForecast.valid_date}</WeatherInfo>
      </WeatherInfoBox>
      <WeatherInfoBox>
        <WeatherInfoTitle>Temperature:</WeatherInfoTitle>
        <WeatherInfo>{endDayForecast.temp}°C</WeatherInfo>
      </WeatherInfoBox>
      <WeatherInfoBox>
        <WeatherInfoTitle>Weather:</WeatherInfoTitle>
        <WeatherInfo>{endDayForecast.weather.description}</WeatherInfo>
      </WeatherInfoBox>
    </WeatherContainer>
  );
};

export default WeatherForecast;