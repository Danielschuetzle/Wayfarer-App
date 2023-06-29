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

const BudgetContainer = styled.div`
  position: relative;
`;

const CurrencySymbol = styled.span`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #777;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TravelPlanForm = ({ onFormSubmit }) => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activity, setActivity] = useState('');
  const [tag, setTag] = useState('');
  const [budget, setBudget] = useState('');
  const [picture, setPicture] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const travelPlanData = {
      planName,
      startDate,
      endDate,
      activity,
      tag,
      budget,
      picture,
    };

    onFormSubmit(travelPlanData);
    setPlanName('');
    setStartDate('');
    setEndDate('');
    setActivity('');
    setTag('');
    setBudget('');
    setPicture(null);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
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
          />
        </FieldContainer>
        <FieldContainer>
          <Label>Budget:</Label>
          <BudgetContainer>
            <CurrencySymbol>€</CurrencySymbol>
            <Input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </BudgetContainer>
        </FieldContainer>
      </FlexContainer>
      <FlexContainer>
        <FieldContainer>
          <Label>Start Date:</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FieldContainer>
        <FieldContainer>
          <Label>End Date:</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FieldContainer>
      </FlexContainer>
      <FlexContainer>
        <FieldContainer>
          <Label>Activity:</Label>
          <Input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </FieldContainer>
        <FieldContainer>
          <Label>Tag:</Label>
          <Input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </FieldContainer>
      </FlexContainer>
      <FlexContainer>
        <FieldContainer>
          <Label>Plan Picture:</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
          />
        </FieldContainer>
      </FlexContainer>
      <Button type="submit">Add Travel Plan</Button>
    </Form>
  );
};

export default TravelPlanForm;
