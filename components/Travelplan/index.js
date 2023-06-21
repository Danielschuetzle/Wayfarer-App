import Link from 'next/link';

const TravelPlan = ({ plan }) => {
  return (
    <div>
      <Link href={`/plans/${plan.id}`}>
        <a>
          <h2>{plan.name}</h2>
          <p>Start Date: {plan.startDate}</p>
          <p>End Date: {plan.endDate}</p>
          <p>Activity: {plan.activity}</p>
        </a>
      </Link>
    </div>
  );
};

export default TravelPlan;
