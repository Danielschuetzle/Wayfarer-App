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

const PlanName = styled.h1`
  color: #3f72af;
  font-size: 24px;
  margin-bottom: 20px;
`;

const DetailItem = styled.p`
  color: navy;
  font-size: 18px;
`;

const Tag = styled.p`
  color: navy;
  font-size: 18px;
`;

const Budget = styled.p`
  color: navy;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
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

const UploadButtonContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const UploadButton = styled.label`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TravelPlanDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [travelPlan, setTravelPlan] = useState(null);

  useEffect(() => {
    const fetchTravelPlan = () => {
      const storedPlans = localStorage.getItem('travelPlans');
      if (storedPlans) {
        const travelPlans = JSON.parse(storedPlans);
        const selectedTravelPlan = travelPlans.find((plan) => plan.id === parseInt(id));
        setTravelPlan(selectedTravelPlan);
      }
    };

    fetchTravelPlan();
  }, [id]);

  const handleReturn = () => {
    router.push('/');
  };

  const handleEdit = () => {
    router.push(`/travelplans/edit?id=${id}`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this travel plan?');
    if (confirmed) {
      const storedPlans = localStorage.getItem('travelPlans');
      if (storedPlans) {
        const travelPlans = JSON.parse(storedPlans);
        const updatedTravelPlans = travelPlans.filter((plan) => plan.id !== parseInt(id));
        localStorage.setItem('travelPlans', JSON.stringify(updatedTravelPlans));
        router.push('/');
      }
    }
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTravelPlan((prevTravelPlan) => ({
          ...prevTravelPlan,
          picture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!travelPlan) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <PlanName>{travelPlan.planName}</PlanName>
      <DetailItem>Start Date: {travelPlan.startDate}</DetailItem>
      <DetailItem>End Date: {travelPlan.endDate}</DetailItem>
      <DetailItem>Activities: {travelPlan.activity}</DetailItem>
      <Tag>Tag: {travelPlan.tag}</Tag>
      <Budget>Budget: {travelPlan.budget} €</Budget>
      <ButtonContainer>
        <ReturnButton onClick={handleReturn}>Return</ReturnButton>
        <EditButton onClick={handleEdit}>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </ButtonContainer>
      {travelPlan.picture && (
        <ImageContainer>
          <Image src={travelPlan.picture} alt="Plan Picture" />
        </ImageContainer>
      )}
      <UploadButtonContainer>
        <UploadButton>
          Upload Picture
          <FileInput type="file" accept="image/*" onChange={handlePictureUpload} />
        </UploadButton>
      </UploadButtonContainer>
    </Container>
  );
};

export default TravelPlanDetail;
