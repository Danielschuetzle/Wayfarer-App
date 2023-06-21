import React from 'react';
import Link from 'next/link';

const TravelPlan = ({ plan, index }) => {
  return (
    <div>
      <h2>
        <Link href={`/plan/${index}`}>
          {plan.name}
        </Link>
      </h2>
      <p>{plan.startDate} - {plan.endDate}</p>
    </div>
  );
}

export default TravelPlan;
