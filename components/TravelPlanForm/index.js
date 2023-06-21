import React, { useState } from 'react';

const TravelPlanForm = ({ addTravelPlan }) => {
  const [plan, setPlan] = useState({
    name: '',
    startDate: '',
    endDate: '',
    activity: ''
  });

  const handleChange = (event) => {
    setPlan({
      ...plan,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new plan object with the input data
    // and an activities array with a single activity.
    const newPlan = {
      ...plan,
      activities: [{
        name: plan.activity,
        startDate: plan.startDate,
        endDate: plan.endDate,
        details: '' // Fill this in with appropriate data
      }]
    }

    // Add the new plan
    addTravelPlan(newPlan);

    // Reset the form
    setPlan({
      name: '',
      startDate: '',
      endDate: '',
      activity: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={plan.name} onChange={handleChange} placeholder="Plan Name" required />
      <input type="date" name="startDate" value={plan.startDate} onChange={handleChange} required />
      <input type="date" name="endDate" value={plan.endDate} onChange={handleChange} required />
      <input type="text" name="activity" value={plan.activity} onChange={handleChange} placeholder="Activity" required />
      <button type="submit">Save Travel Plan</button>
    </form>
  );
};

export default TravelPlanForm;
