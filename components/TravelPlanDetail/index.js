import { useEffect, useState } from 'react';

const TravelPlanDetail = ({ id }) => {
  // Create a state variable to store the fetched travel plan
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    // Define an effect to fetch the travel plan when the component mounts and every time the 'id' prop changes
    const fetchPlan = async () => {
      // Make a fetch request to the API endpoint that retrieves the travel plan based on the provided 'id'
      const res = await fetch(`/api/plans/${id}`);
      const data = await res.json();
      setPlan(data); // Update the state with the fetched travel plan
    };

    fetchPlan(); // Call the fetchPlan function
  }, [id]); // The effect depends on the 'id' prop

  // If the travel plan hasn't been fetched yet, render a loading message
  if (!plan) {
    return <div>Loading...</div>;
  }

  // Sort the activities by their start dates
  const sortedActivities = plan.activities.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

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
};

export default TravelPlanDetail;
