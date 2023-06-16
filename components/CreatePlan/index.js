import React, { useState } from 'react';

export default function CreatePlan() {
    const [name, setName] = useState('');
    const [destination, setDestination] = useState('');
  

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/createPlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, destination, /* ... */ }),
        });

        const data = await response.json();

        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Destination:
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </label>
            {/* ... */}
            <button type="submit">Create Plan</button>
        </form>
    );
}
