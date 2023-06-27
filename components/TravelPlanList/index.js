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
  position: absolute;
  top: 8px;
  right: 8px;
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

  &:hover {
    background-color: #e24432;
  }
`;

const TravelPlanList = ({ travelPlans, handleDelete }) => {
  const router = useRouter();

  const handlePlanClick = (id) => {
    router.push(`/travelplans/${id}`);
  };

  function handleDeletePlan(event, id) {
    event.stopPropagation();
    handleDelete(id);
  }

  return (
    <Wrapper>
      <Title>Travel Plans</Title>
      {travelPlans.length > 0 ? (
        travelPlans.map((plan) => (
          <PlanItem key={plan._id} onClick={() => handlePlanClick(plan._id)}>
            <div>
              <h3>{plan.planName}</h3>
              <p>
                Start Date: {plan.startDate} - End Date: {plan.endDate}
              </p>
              <p>Activity: {plan.activity}</p>
            </div>
            <DeleteButton onClick={(event) => handleDeletePlan(event, plan._id)}>x</DeleteButton>
          </PlanItem>
        ))
      ) : (
        <p>No travel plans yet.</p>
      )}
    </Wrapper>
  );
};

export default TravelPlanList;
