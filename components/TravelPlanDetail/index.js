import { useEffect, useState } from 'react';
import fetch from 'node-fetch';

const TravelPlanDetail = ({ id }) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    // Fetch the travel plan when the component mounts and every time the 'id' prop changes
    const fetchPlan = async () => {
      // Make a request to the API endpoint to fetch the travel plan by its ID
      const res = await fetch(`/api/plans/${id}`);
      const data = await res.json();
      setPlan(data);
    };

    fetchPlan();
  }, [id]);

  if (!plan) {
    return <div>Loading...</div>;
  }

  // Sort the activities by their start dates
  const sortedActivities = plan.activities.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

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
