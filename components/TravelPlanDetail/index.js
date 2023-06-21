import React from 'react';

const TravelPlanDetail = ({ plan }) => {
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
