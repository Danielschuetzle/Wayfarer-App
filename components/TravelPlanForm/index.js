import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createTravelPlan } from '../../lib/travelPlanDb'; 


const TravelPlanForm = () => {

    const router = useRouter();

    // Initialize the state of the form fields
    const [plan, setPlan] = useState({
        name: '',
        startDate: '',
        endDate: '',
        activity: ''
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

        // Call createTravelPlan with the plan data to save it in the database
        const result = await createTravelPlan(plan);

        // Redirect the user to the detail page of the newly created plan
        router.push(`/plan/${result._id}`);

        // Clear the form fields
        setPlan({
            name: '',
            startDate: '',
            endDate: '',
            activity: ''
        });
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
