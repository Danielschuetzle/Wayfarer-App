import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

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

const fetcher = (url) => fetch(url).then((res) => res.json());

const WeatherForecast = ({ location, startDate, endDate }) => {
  const { data, error } = useSWR(
    `/api/weather?city=${location}&startDate=${startDate}&endDate=${endDate}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // Filter out only the weather data for start and end dates
  const filteredData = data.filter(day => day.valid_date === startDate || day.valid_date === endDate);

  return (
    <WeatherContainer>
      <WeatherTitle>Weather Forecast</WeatherTitle>
      <WeatherInfoList>
        {filteredData.map((day, index) => (
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
