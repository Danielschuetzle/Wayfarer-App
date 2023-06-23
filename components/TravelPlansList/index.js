import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const TravelPlansList = () => {
  const { data: plans, error } = useSWR('/api/plans', fetcher);
  console.log(plans);
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
          <p>Start Date: {plan.startDate}</p>
          <p>End Date: {plan.endDate}</p>
          <p>Activities: {plan.activities.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default TravelPlansList;
