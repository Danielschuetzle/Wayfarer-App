import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #3f72af;
  font-size: 20px;
  margin-bottom: 10px;
`;

const PlanItem = styled.div`
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
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TravelPlanList = ({ travelPlans, handleDelete }) => {
  const router = useRouter();

  const handlePlanClick = (index) => {
    router.push(`/travelplans/${index}`);
  };

  return (
    <Wrapper>
      <Title>Travel Plans</Title>
      {travelPlans.length > 0 ? (
        travelPlans.map((plan, index) => (
          <PlanItem key={plan.planName} onClick={() => handlePlanClick(index)}>
            <div>
              <h3>{plan.planName}</h3>
              <p>
                Start Date: {plan.startDate} - End Date: {plan.endDate}
              </p>
              <p>Activity: {plan.activity}</p>
            </div>
            <DeleteButton onClick={() => handleDelete(index)}>x</DeleteButton>
          </PlanItem>
        ))
      ) : (
        <p>No travel plans yet.</p>
      )}
    </Wrapper>
  );
};

export default TravelPlanList;
