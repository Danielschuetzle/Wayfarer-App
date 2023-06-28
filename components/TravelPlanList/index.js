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
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f8fb;
  }
`;

const Tag = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  color: navy;
  font-size: 14px;
  font-weight: bold;
  background-color: #3f72af;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
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
  font-weight: bolder;
`;

const Activity = styled.p`
  color: navy;
  font-size: 14px;
  margin-top: 10px;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  z-index: -1;
`;

const TravelPlanList = ({ travelPlans }) => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('travelPlans', JSON.stringify(travelPlans));
  }, [travelPlans]);

  const handlePlanClick = (id) => {
    router.push(`/travelplans/${id}`);
  };

  return (
    <Wrapper>
      <Title>Travel Plans</Title>
      {travelPlans.length > 0 ? (
        travelPlans.map((plan) => (
          <PlanItem
            key={plan.id}
            onClick={() => handlePlanClick(plan.id)}
            style={{ position: 'relative' }}
          >
            <BackgroundImage image={plan.picture} />
            <InfoWrapper>
              <PlanName>{plan.planName}</PlanName>
              <Duration>
                {`${new Date(plan.startDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })} - ${new Date(plan.endDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })}`}
              </Duration>
              <Activity>{plan.activity}</Activity>
            </InfoWrapper>
            <Tag>{plan.tag}</Tag>
          </PlanItem>
        ))
      ) : (
        <p>No travel plans yet.</p>
      )}
    </Wrapper>
  );
};

export default TravelPlanList;
