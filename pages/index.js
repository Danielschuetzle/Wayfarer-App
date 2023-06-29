import React, { useState } from 'react';
import styled from 'styled-components';
import TravelPlanForm from '../components/TravelPlanForm';
import TravelPlanList from '../components/TravelPlanList';
import Calendar from '../components/Calendar';
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

const ActionButton = styled.button`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin: 10px auto;
  display: block;
  cursor: pointer;
`;

const HomePage = () => {
  const [travelPlans, setTravelPlans] = useState(exampleTravelPlans);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSubmit = (travelPlanData) => {
    const newTravelPlan = {
      id: Date.now(),
      ...travelPlanData,
      imageUrl: null, // Initially set image URL to null
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

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <Container>
      <Title>Wayfarer Planner</Title>
      <ActionButton onClick={handleFormToggle}>
        {isFormOpen ? 'Cancel' : 'Add New Travel Plan'}
      </ActionButton>
      {isFormOpen && <TravelPlanForm onFormSubmit={handleFormSubmit} />}
      <TravelPlanList travelPlans={travelPlans} onPlanDelete={handlePlanDelete} />
      <ActionButton onClick={handleCalendarToggle}>
        {isCalendarOpen ? 'Close Calendar' : 'Open Calendar'}
      </ActionButton>
      {isCalendarOpen && <Calendar travelPlans={travelPlans} />}
    </Container>
  );
};

export default HomePage;
