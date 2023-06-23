import React from 'react';
import TravelPlanForm from '../components/TravelPlanForm';
import TravelPlansList from '../components/TravelPlansList';

const HomePage = ({ travelPlans }) => {
  return (
    <>
      <TravelPlanForm />
      <TravelPlansList travelPlans={travelPlans} />
    </>
  );
}

export default HomePage;
