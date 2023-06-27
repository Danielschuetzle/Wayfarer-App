import React from 'react';
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

const TravelPlanner = ({ travelPlans, addTravelPlan }) => {
  const handleSubmit = (data) => {
    addTravelPlan(data);
  };

  return (
    <Container>
      <Title>Wayfarer Planner</Title>
      <TravelPlanForm onSubmit={handleSubmit} />
      <TravelPlanList travelPlans={travelPlans} />
      <Calendar travelPlans={travelPlans} />
    </Container>
  );
};

const HomePage = () => {
  return <TravelPlanner travelPlans={exampleTravelPlans} addTravelPlan={() => {}} />;
};

export default HomePage;
