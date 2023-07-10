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
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : `url("/default_background.avif")`};
  background-size: cover;
  background-position: center;
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
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
`;

const Duration = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

const Activity = styled.p`
  color: #fff;
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
  ::before {
    content: '■ ';
  }
`;

const Budget = styled.p`
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
  ::after {
    content: '€';
  }
`;

const TravelPlanList = ({ travelPlans }) => {  // receive travelPlans from props
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
            image={plan.picture ? plan.picture : null}
          >
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
              <div>
                {plan.activities.map((activity, index) => (
                  <Activity key={index}>{activity}</Activity>
                ))}
              </div>
              <Budget>{plan.budget}</Budget>
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
