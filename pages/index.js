import React from 'react';
import TravelPlanForm from '../components/TravelPlanForm';
import TravelPlansList from '../components/TravelPlansList';

const HomePage = () => {
  return (
    <>
      <TravelPlanForm />
      <TravelPlansList />
    </>
  );
}

export default HomePage;
