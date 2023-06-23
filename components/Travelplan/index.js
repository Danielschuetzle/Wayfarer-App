import React from 'react';
import Link from 'next/link';

const TravelPlan = ({ plan }) => {
  // Check if the _id property is present in the plan object
  if (!plan._id) {
    return <div>Invalid travel plan</div>;
  }

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
