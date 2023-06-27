import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import exampleTravelPlans from '../../data/exampleTravelPlans';

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #3f72af;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const PlanItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  transition: background-color 0.3s;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #e24432;
  }
`;

const InfoWrapper = styled.div`
  flex-grow: 1;
`;

const PlanName = styled.h3`
  color: #3f72af;
  margin-bottom: 5px;
`;

const Duration = styled.p`
  color: #5188c6;
  font-weight: bold;
`;

const Activity = styled.p`
  color: navy;
  font-size: 14px;
  margin-top: 10px;
`;

const TravelPlanList = () => {
  const [travelPlans, setTravelPlans] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let storedTravelPlans = JSON.parse(localStorage.getItem('travelPlans'));
    if (!Array.isArray(storedTravelPlans) || !storedTravelPlans.length) {
      storedTravelPlans = exampleTravelPlans;
      localStorage.setItem('travelPlans', JSON.stringify(storedTravelPlans));
    }
    setTravelPlans(storedTravelPlans);
  }, []);

  const handlePlanClick = (id) => {
    router.push(`/travelplans/${id}`);
  };

  const handleDeletePlan = (e, id) => {
    e.stopPropagation();
    const updatedTravelPlans = travelPlans.filter((plan) => plan.id !== id);
    localStorage.setItem('travelPlans', JSON.stringify(updatedTravelPlans));
    setTravelPlans(updatedTravelPlans);
  };

  return (
    <Wrapper>
      <Title>Travel Plans</Title>
      {travelPlans.length > 0 ? (
        travelPlans.map((plan) => (
          <PlanItem key={plan.id} onClick={() => handlePlanClick(plan.id)}>
            <InfoWrapper>
              <PlanName>{plan.planName}</PlanName>
              <Duration>
                {`${new Date(plan.startDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })} - ${new Date(plan.endDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}`}
              </Duration>
              <Activity>{plan.activity}</Activity>
            </InfoWrapper>
            <DeleteButton onClick={(e) => handleDeletePlan(e, plan.id)}>x</DeleteButton>
          </PlanItem>
        ))
      ) : (
        <p>No travel plans yet.</p>
      )}
    </Wrapper>
  );
};

export default TravelPlanList;
