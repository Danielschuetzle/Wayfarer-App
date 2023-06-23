import useSWR from 'swr';

const fetchData = (url) => fetch(url).then(response => response.json());

const TravelPlansList = () => {
  const { data: plans, error } = useSWR('/api/plans', fetchData);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!plans) {
    return <div>Loading...</div>;
  }

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
}

export default TravelPlansList;
