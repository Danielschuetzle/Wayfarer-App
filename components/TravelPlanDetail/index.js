import { useEffect, useState } from 'react';
import getTravelPlan from '../lib/travelPlanDb'; 

// This component receives a travel plan id as a prop and displays its details
const TravelPlanDetail = ({ id }) => {
  // Create a state variable to store the fetched travel plan
  const [plan, setPlan] = useState(null);

  // Use useEffect to fetch the travel plan when the component mounts and every time the 'id' prop changes
  useEffect(() => {
    // Define an async function to fetch the travel plan
    const fetchPlan = async () => {
      // Fetch the travel plan from the database
      const fetchedPlan = await getTravelPlan(id);
      // Update the state with the fetched travel plan
      setPlan(fetchedPlan);
    };

    // Call the fetchPlan function
    fetchPlan();
  }, [id]); // The effect depends on the 'id' prop

  // If the travel plan hasn't been fetched yet, render a loading message
  if (!plan) {
    return <div>Loading...</div>;
  }

  // Sort the activities by their start dates
  const sortedActivities = plan.activities.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // Once the travel plan has been fetched, render its details
  return (
    <div>
      <h2>{plan.name}</h2>
      {sortedActivities.map((activity, index) => (
        <div key={index}>
          <h3>{activity.name}</h3>
          <p>{activity.startDate} - {activity.endDate}</p>
          <p>{activity.details}</p>
        </div>
      ))}
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}

export default TravelPlanDetail;
