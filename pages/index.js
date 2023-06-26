import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TravelPlanForm from '../components/TravelPlanForm';
import TravelPlanList from '../components/TravelPlanList';
import Link from 'next/link';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f8fb;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #3f72af;
  font-size: 24px;
  margin-bottom: 20px;
`;

const TravelPlanner = () => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activity, setActivity] = useState('');
  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    fetch('/api/travelplans')
      .then((response) => response.json())
      .then((data) => setTravelPlans(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (planName && startDate && endDate && activity) {
      const newTravelPlan = {
        planName,
        startDate,
        endDate,
        activity,
      };

      fetch('/api/travelplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTravelPlan),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Received data:', data); // Add this line
          setTravelPlans((prevTravelPlans) => [...prevTravelPlans, data]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      setPlanName('');
      setStartDate('');
      setEndDate('');
      setActivity('');
    }
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this travel plan?'
    );

    if (confirmed) {
      fetch(`/api/travelplans/${index}`, { method: 'DELETE' })
        .then(() => {
          const updatedPlans = [...travelPlans];
          updatedPlans.splice(index, 1);
          setTravelPlans(updatedPlans);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <Container>
      <Title>Wayfarer Travel Planner</Title>
      <TravelPlanForm
        handleSubmit={handleSubmit}
        planName={planName}
        setPlanName={setPlanName}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        activity={activity}
        setActivity={setActivity}
      />
      <TravelPlanList
        travelPlans={travelPlans}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default TravelPlanner;
