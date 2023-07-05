import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  margin-top: 20px;
  background-color: #f5f8fb;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const WeatherTitle = styled.h2`
  color: #3f72af;
  font-size: 18px;
  margin: 20px 0;
  text-align: center;
`;

const WeatherInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const WeatherInfoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;

  &:last-child {
    border-bottom: none;
  }
`;

const WeatherInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const WeatherInfoTitle = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const WeatherInfoValue = styled.p`
  font-weight: normal;
`;

const WeatherForecast = ({ location, startDate, endDate }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.NEXT_PUBLIC_WEATHER_API}&city=${location}&start_date=${startDate}&end_date=${endDate}`
        );
        const data = await response.json();
        const filteredData = data.data.filter((day) => day.valid_date >= startDate && day.valid_date <= endDate);
        setWeatherData(filteredData);
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

  if (!weatherData.length) {
    return <p>Unable to fetch weather forecast.</p>;
  }

  return (
    <WeatherContainer>
      <WeatherTitle>Weather Forecast</WeatherTitle>
      <WeatherInfoList>
        {weatherData.map((day, index) => (
          <WeatherInfoItem key={index}>
            <WeatherInfoGroup>
              <WeatherInfoTitle>Date:</WeatherInfoTitle>
              <WeatherInfoValue>{day.valid_date}</WeatherInfoValue>
            </WeatherInfoGroup>
            <WeatherInfoGroup>
              <WeatherInfoTitle>Temperature:</WeatherInfoTitle>
              <WeatherInfoValue>{day.temp}°C</WeatherInfoValue>
            </WeatherInfoGroup>
            <WeatherInfoGroup>
              <WeatherInfoTitle>Weather:</WeatherInfoTitle>
              <WeatherInfoValue>{day.weather.description}</WeatherInfoValue>
            </WeatherInfoGroup>
          </WeatherInfoItem>
        ))}
      </WeatherInfoList>
    </WeatherContainer>
  );
};

export default WeatherForecast;
