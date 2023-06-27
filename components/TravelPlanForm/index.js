import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  color: #3f72af;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TravelPlanForm = ({ onSubmit }) => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activity, setActivity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const travelPlanData = {
      planName,
      startDate,
      endDate,
      activity,
    };
    onSubmit(travelPlanData);
    setPlanName('');
    setStartDate('');
    setEndDate('');
    setActivity('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Plan Name:</Label>
      <Input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} />
      <Label>Start Date:</Label>
      <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <Label>End Date:</Label>
      <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <Label>Activity:</Label>
      <Input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
      <Button type="submit">Add Travel Plan</Button>
    </Form>
  );
};

export default TravelPlanForm;
