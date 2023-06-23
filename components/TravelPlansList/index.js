import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const TravelPlansList = ({ travelPlans }) => {
  const { data: fetchedPlans, error } = useSWR('/api/plans', fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const plans = fetchedPlans || travelPlans;

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
};

export default TravelPlansList;
