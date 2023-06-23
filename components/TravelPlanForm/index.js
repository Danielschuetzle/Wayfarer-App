import React, { useState } from 'react';
import { useRouter } from 'next/router';

const TravelPlanForm = ({ addTravelPlan }) => {
  const router = useRouter();

  // Initialize the state of the form fields
  const initialPlanState = {
    name: '',
    startDate: '',
    endDate: '',
    activity: '',
  };

  const [plan, setPlan] = useState(initialPlanState);

  // Handler function to update state when input fields change
  const handleChange = (event) => {
    setPlan({
      ...plan,
      [event.target.name]: event.target.value,
    });
  };

  // Handler function for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!plan.name || !plan.startDate || !plan.endDate || !plan.activity) {
      alert('Please fill in all fields');
      return;
    }

    // Make a request to the API route with the plan data to save it in the database
    const res = await fetch('/api/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plan),
    });

    if (!res.ok) {
      alert('Failed to save travel plan');
      return;
    }

    const result = await res.json();

    // Add the plan to the local display
    addTravelPlan(result);

    // Redirect the user to the detail page of the newly created plan
    router.push(`/plan/${result._id}`);

    // Clear the form fields
    setPlan(initialPlanState);
  };

  // Render the form
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
