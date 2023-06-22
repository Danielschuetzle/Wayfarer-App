import React from 'react';
import Link from 'next/link';

const TravelPlan = ({ plan }) => {
  return (
    <div>
      <h2>
        <Link href={`/plan/${plan._id}`}>
          {plan.name}
        </Link>
      </h2>
      <p>{plan.startDate} - {plan.endDate}</p>
    </div>
  );
}

export default TravelPlan;
