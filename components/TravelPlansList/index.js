import { useEffect, useState } from 'react';

// Component for displaying a list of travel plans
const TravelPlansList = () => {
  const [plans, setPlans] = useState([]); // State variable to store the travel plans

  useEffect(() => {
    // Fetch travel plans from the API
    const fetchPlans = async () => {
      const response = await fetch('/api/plans');
      const data = await response.json();
      setPlans(data); // Update the state with the fetched travel plans
    };

    fetchPlans(); // Fetch travel plans when the component mounts
  }, []);

  return (
    <div>
      <h1>Travel Plans</h1>
      {plans.map((plan) => (
        <div key={plan._id}>
          <h2>{plan.name}</h2>
          <p>Start Date: {new Date(plan.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
          <p>Activities: {plan.activities.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default TravelPlansList;
