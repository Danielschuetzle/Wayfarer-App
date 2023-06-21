const TravelPlan = ({ plan }) => {
    return (
      <div>
        <h2>{plan.name}</h2>
        <p>Start Date: {plan.startDate}</p>
        <p>End Date: {plan.endDate}</p>
        <p>Activity: {plan.activity}</p>
      </div>
    );
  };
  
  export default TravelPlan;
  