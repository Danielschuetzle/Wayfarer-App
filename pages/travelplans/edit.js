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

const UploadButton = styled.label`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  text-align: center;
`;

const FileInput = styled.input`
  display: none;
`;

const TravelPlanEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activity, setActivity] = useState('');
  const [tag, setTag] = useState('');
  const [budget, setBudget] = useState(0);
  const [picture, setPicture] = useState(null);

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
        setTag(selectedTravelPlan.tag);
        setBudget(selectedTravelPlan.budget);
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
      tag,
      budget,
      picture,
    };
    const storedPlans = localStorage.getItem('travelPlans');
    if (storedPlans) {
      const travelPlans = JSON.parse(storedPlans);
      const updatedTravelPlans = travelPlans.map((plan) =>
        plan.id === parseInt(id) ? updatedTravelPlan : plan
      );
      localStorage.setItem('travelPlans', JSON.stringify(updatedTravelPlans));
      router.push(`/travelplans/${id}`);
    }
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
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
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <Input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Activity"
          required
        />
        <Input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag"
          required
        />
        <Input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget (€)"
          required
        />
        <UploadButton>
          Upload Picture
          <FileInput type="file" accept="image/*" onChange={handlePictureUpload} />
        </UploadButton>
        <SubmitButton type="submit">Submit changes</SubmitButton>
      </Form>
    </Container>
  );
};

export default TravelPlanEdit;
