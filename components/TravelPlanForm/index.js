import React, { useState } from 'react';
import { useRouter } from 'next/router';

const TravelPlanForm = () => {

    const router = useRouter();

    // Initialize the state of the form fields
    const [plan, setPlan] = useState({
        name: '',
        startDate: '',
        endDate: '',
        activities: [] //Changed from activity to activities
    });

    // Handler function to update state when input fields change
    const handleChange = (event) => {
        setPlan({
            ...plan,
            [event.target.name]: event.target.value
        });
    };

    // Handler function for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Make a request to our API route with the plan data to save it in the database
        const res = await fetch('/api/travelPlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plan),
        });

        const result = await res.json(); 

        // Redirect the user to the detail page of the newly created plan
        router.push(`/plan/${result._id}`);

        // Clear the form fields
        setPlan({
            name: '',
            startDate: '',
            endDate: '',
            activities: []
        });
    };

    // Render the form
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={plan.name} onChange={handleChange} placeholder="Plan Name" required />
            <input type="date" name="startDate" value={plan.startDate} onChange={handleChange} required />
            <input type="date" name="endDate" value={plan.endDate} onChange={handleChange} required />
            {/* We'll need a way to add activities to our activities array, but for now, we'll leave this out
            <input type="text" name="activity" value={plan.activity} onChange={handleChange} placeholder="Activity" required />
            */}
            <button type="submit">Save Travel Plan</button>
        </form>
    );
};

export default TravelPlanForm;
