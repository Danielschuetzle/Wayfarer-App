import React from 'react';
import TravelPlanForm from '../components/TravelPlanForm';
import TravelPlan from '../components/TravelPlan';

const HomePage = ({ travelPlans, addTravelPlan }) => {
  return (
    <>
      <TravelPlanForm addTravelPlan={addTravelPlan} />
      {travelPlans.map((plan, index) => (
        <TravelPlan key={index} plan={plan} index={index} />
      ))}
    </>
  );
}

export default HomePage;
