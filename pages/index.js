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
const HomePage = () => {
  const [travelPlans, setTravelPlans] = useState(exampleTravelPlans);

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

  return (
    <Container>
      <Title>Wayfarer Planner</Title>
      <TravelPlanForm onFormSubmit={handleFormSubmit} />
      <TravelPlanList travelPlans={travelPlans} onPlanDelete={handlePlanDelete} /> {/* pass state and delete function */}
      <Calendar travelPlans={travelPlans} />
    </Container>
  );
};

export default HomePage;