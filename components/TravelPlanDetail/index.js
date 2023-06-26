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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ReturnButton = styled.button`
  background-color: #888;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;
const TravelPlanDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [travelPlan, setTravelPlan] = useState(null);

  useEffect(() => {
    const fetchTravelPlan = async () => {
      try {
        const response = await fetch(`/api/travelplans/${id}`);
        const data = await response.json();
        setTravelPlan(data);
      } catch (error) {
        console.error('Error fetching travel plan details:', error);
      }
    };

    if (id !== undefined) {
      fetchTravelPlan();
    }
  }, [id]);

  const handleReturn = () => {
    router.push('/');
  };

  const handleEdit = () => {
    router.push(`/travelplans/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this travel plan?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/travelplans/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Travel plan deleted successfully');
          router.push('/');
        } else {
          console.error('Error deleting travel plan');
        }
      } catch (error) {
        console.error('Error deleting travel plan:', error);
      }
    }
  };

  if (!travelPlan) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>Travel Plan Detail Page</Title>
      <p>ID: {travelPlan._id}</p>
      <p>Plan Name: {travelPlan.name}</p>
      <p>Start Date: {travelPlan.startDate}</p>
      <p>End Date: {travelPlan.endDate}</p>
      <p>Activities: {travelPlan.activities.join(', ')}</p>
      <ButtonContainer>
        <ReturnButton onClick={handleReturn}>Return</ReturnButton>
        <EditButton onClick={handleEdit}>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </ButtonContainer>
    </Container>
  );
};

export default TravelPlanDetail;
