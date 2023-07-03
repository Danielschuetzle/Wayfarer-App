import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const FieldContainer = styled.div`
  flex: 1;
`;

const Label = styled.label`
  color: #3f72af;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const AddTravelPlanButton = styled.button`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #f03e3e;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const ActivityButton = styled.button`
  height: fit-content;
  align-self: flex-end;
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: #3f72af;
  border: 1px solid #3f72af;
  border-radius: 4px;
  background-color: #fff;
`;

const TravelPlanForm = ({ onFormSubmit }) => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activities, setActivities] = useState(['']);
  const [budget, setBudget] = useState('');
  const [tag, setTag] = useState('');
  const [picture, setPicture] = useState(null);

  const addActivity = () => {
    setActivities([...activities, '']);
  };

  const updateActivity = (value, index) => {
    const newActivities = [...activities];
    newActivities[index] = value;
    setActivities(newActivities);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const travelPlanData = {
      planName,
      startDate,
      endDate,
      activities,
      budget,
      tag,
      picture,
    };

    onFormSubmit(travelPlanData);
    setPlanName('');
    setStartDate('');
    setEndDate('');
    setActivities(['']);
    setBudget('');
    setTag('');
    setPicture(null);
  };

  const handleCancel = () => {
    setPlanName('');
    setStartDate('');
    setEndDate('');
    setActivities(['']);
    setBudget('');
    setTag('');
    setPicture(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FlexContainer>
        <FieldContainer>
          <Label>Plan Name:</Label>
          <Input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </FieldContainer>
        <FieldContainer>
          <Label>Tag:</Label>
          <Input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </FieldContainer>
      </FlexContainer>
      <FlexContainer>
        <FieldContainer>
          <Label>Start Date:</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </FieldContainer>
        <FieldContainer>
          <Label>End Date:</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </FieldContainer>
      </FlexContainer>
      <FlexContainer>
        <FieldContainer>
          <Label>Activity 1:</Label>
          <Input
            type="text"
            value={activities[0]}
            onChange={(e) => updateActivity(e.target.value, 0)}
            required
          />
        </FieldContainer>
        <ActivityButton type="button" onClick={addActivity}>
          Add Activity
        </ActivityButton>
      </FlexContainer>
      {activities.slice(1).map((activity, index) => (
        <FlexContainer key={`${activity}-${index}`}>
          <FieldContainer>
            <Label>Activity {index + 2}:</Label>
            <Input
              type="text"
              value={activity}
              onChange={(e) => updateActivity(e.target.value, index + 1)}
              required
            />
          </FieldContainer>
        </FlexContainer>
      ))}
      <FlexContainer>
        <FieldContainer>
          <Label>Budget:</Label>
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </FieldContainer>
        <FieldContainer>
          <Label>Picture:</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </FieldContainer>
      </FlexContainer>
      <ActionContainer>
        <AddTravelPlanButton type="submit">Add Travel Plan</AddTravelPlanButton>
      </ActionContainer>
    </Form>
  );
};

export default TravelPlanForm;
