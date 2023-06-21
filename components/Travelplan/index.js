import React from "react";

const TravelPlan = ({ plan: { name, startDate, endDate, activity } }) => (
    <div>
        <h2>{name}</h2>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
        <p>Activity: {activity}</p>
    </div>
);

export default TravelPlan;
