import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const TravelPlanEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activity, setActivity] = useState('');

  useEffect(() => {
    const fetchTravelPlan = () => {
      const storedPlans = localStorage.getItem('travelPlans');
      if (storedPlans) {
        const travelPlans = JSON.parse(storedPlans);
        const selectedTravelPlan = travelPlans.find((plan) => plan.id === parseInt(id));
        setPlanName(selectedTravelPlan.planName);
        setStartDate(selectedTravelPlan.startDate);
        setEndDate(selectedTravelPlan.endDate);
        setActivity(selectedTravelPlan.activity);
      }
    };

    if (id !== undefined) {
      fetchTravelPlan();
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTravelPlan = {
      id: parseInt(id),
      planName,
      startDate,
      endDate,
      activity,
    };
    const storedPlans = localStorage.getItem('travelPlans');
    if (storedPlans) {
      const travelPlans = JSON.parse(storedPlans);
      const updatedTravelPlans = travelPlans.map((plan) => plan.id === parseInt(id) ? updatedTravelPlan : plan);
      localStorage.setItem('travelPlans', JSON.stringify(updatedTravelPlans));
      router.push(`/travelplans/${id}`);  // Redirect to the details page after editing
    }
  };

  return (
    <Container>
      <Title>Edit Travel Plan</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          placeholder="Plan Name"
          required
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <Input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Activity"
          required
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default TravelPlanEdit;
