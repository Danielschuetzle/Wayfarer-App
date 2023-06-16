import React from 'react';

const PlanList = ({ plans }) => {
    return (
        <div>
            {plans.map((plan) => (
                <div key={plan._id}>
                    <h2>{plan.name}</h2>
                    {/* Display other plan details */}
                </div>
            ))}
        </div>
    );
}

export default PlanList;
