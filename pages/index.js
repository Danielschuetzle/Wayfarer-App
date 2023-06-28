import React, { useState } from 'react';
import styled from 'styled-components';
import TravelPlanForm from '../components/TravelPlanForm';
import TravelPlanList from '../components/TravelPlanList';
import Calendar from '../components/Calendar';
import Navigation from '../components/Navigation';
import exampleTravelPlans from '../data/exampleTravelPlans';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f8fb;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #3f72af;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const CalendarButton = styled.button`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin: 0 auto 20px;
  display: block;
  cursor: pointer;
`;

const HomePage = () => {
  const [travelPlans, setTravelPlans] = useState(exampleTravelPlans);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleFormSubmit = (travelPlanData) => {
    const newTravelPlan = {
      id: Date.now(),
      ...travelPlanData,
    };
    setTravelPlans((prevTravelPlans) => [...prevTravelPlans, newTravelPlan]);
  };

  const handlePlanDelete = (id) => {
    const updatedTravelPlans = travelPlans.filter((plan) => plan.id !== id);
    setTravelPlans(updatedTravelPlans);
  };

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <Container>
      <Title>Wayfarer Planner</Title>
      <TravelPlanForm onFormSubmit={handleFormSubmit} />
      <TravelPlanList travelPlans={travelPlans} onPlanDelete={handlePlanDelete} />
      <CalendarButton onClick={handleCalendarToggle}>
        {isCalendarOpen ? 'Close Calendar' : 'Open Calendar'}
      </CalendarButton>
      {isCalendarOpen && <Calendar travelPlans={travelPlans} />}
    </Container>
  );
};

export default HomePage;
