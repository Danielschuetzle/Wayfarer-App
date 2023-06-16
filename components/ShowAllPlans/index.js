import React, { useEffect, useState } from 'react';

export default function ShowAllPlans() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch('/api/getAllPlans')
            .then((response) => response.json())
            .then((data) => setPlans(data));
    }, []);

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
