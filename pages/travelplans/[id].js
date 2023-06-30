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
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const RowItem = styled.div`
  flex: 1;
`;

const SubmitButton = styled.button`
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

const ReturnButton = styled.button`
  background-color: #888;
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

const ImageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;

  input[type='checkbox'] {
    appearance: none;
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #3f72af;
      border-color: #3f72af;

      &:before {
        content: '\u2713';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
    }
  }
`;

const CheckboxInput = styled.input`
  display: none;
`;

const TravelPlanDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [travelPlan, setTravelPlan] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedPlanName, setEditedPlanName] = useState('');
  const [editedStartDate, setEditedStartDate] = useState('');
  const [editedEndDate, setEditedEndDate] = useState('');
  const [editedActivities, setEditedActivities] = useState([]);
  const [editedTag, setEditedTag] = useState('');
  const [editedBudget, setEditedBudget] = useState('');
  const [editedPicture, setEditedPicture] = useState(null);

  useEffect(() => {
    const fetchTravelPlan = () => {
      const storedPlans = localStorage.getItem('travelPlans');
      if (storedPlans) {
        const travelPlans = JSON.parse(storedPlans);
        const selectedTravelPlan = travelPlans.find((plan) => plan.id === parseInt(id));
        setTravelPlan(selectedTravelPlan);
        setEditedPlanName(selectedTravelPlan.planName);
        setEditedStartDate(selectedTravelPlan.startDate);
        setEditedEndDate(selectedTravelPlan.endDate);
        setEditedActivities([...selectedTravelPlan.activities]);
        setEditedTag(selectedTravelPlan.tag);
        setEditedBudget(selectedTravelPlan.budget);
      }
    };

    fetchTravelPlan();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedPlanName(travelPlan.planName);
    setEditedStartDate(travelPlan.startDate);
    setEditedEndDate(travelPlan.endDate);
    setEditedActivities([...travelPlan.activities]);
    setEditedTag(travelPlan.tag);
    setEditedBudget(travelPlan.budget);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedTravelPlan = {
      ...travelPlan,
      planName: editedPlanName,
      startDate: editedStartDate,
      endDate: editedEndDate,
      activities: editedActivities,
      tag: editedTag,
      budget: editedBudget,
      picture: editedPicture,
    };

    const storedPlans = localStorage.getItem('travelPlans');
    if (storedPlans) {
      const travelPlans = JSON.parse(storedPlans);
      const updatedTravelPlans = travelPlans.map((plan) =>
        plan.id === parseInt(id) ? updatedTravelPlan : plan
      );
      localStorage.setItem('travelPlans', JSON.stringify(updatedTravelPlans));
      setTravelPlan(updatedTravelPlan);
      setEditing(false);
    }
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
        setEditedPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!travelPlan) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>{travelPlan.planName}</Title>
      <Form onSubmit={handleSubmit}>
        <RowContainer>
          <RowItem>
            <Input
              type="text"
              value={editedPlanName}
              onChange={(e) => setEditedPlanName(e.target.value)}
              placeholder="Plan Name"
              required
              disabled={!editing}
            />
          </RowItem>
          <RowItem>
            <Input
              type="text"
              value={editedTag}
              onChange={(e) => setEditedTag(e.target.value)}
              placeholder="Tag"
              required
              disabled={!editing}
            />
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            <Input
              type="date"
              value={editedStartDate}
              onChange={(e) => setEditedStartDate(e.target.value)}
              required
              disabled={!editing}
            />
          </RowItem>
          <RowItem>
            <Input
              type="date"
              value={editedEndDate}
              onChange={(e) => setEditedEndDate(e.target.value)}
              required
              disabled={!editing}
            />
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            {travelPlan.activities.map((activity, index) => (
              <CheckboxLabel key={index}>
                <CheckboxInput
                  type="checkbox"
                  checked={editedActivities.includes(activity)}
                  onChange={(e) => {
                    const updatedActivities = [...editedActivities];
                    if (e.target.checked) {
                      updatedActivities.push(activity);
                    } else {
                      const activityIndex = updatedActivities.indexOf(activity);
                      if (activityIndex !== -1) {
                        updatedActivities.splice(activityIndex, 1);
                      }
                    }
                    setEditedActivities(updatedActivities);
                  }}
                  disabled={!editing}
                />
                {activity}
              </CheckboxLabel>
            ))}
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            <Input
              type="number"
              value={editedBudget}
              onChange={(e) => setEditedBudget(e.target.value)}
              placeholder="Budget (€)"
              required
              disabled={!editing}
            />
          </RowItem>
        </RowContainer>
        {editing && (
          <UploadButton>
            Upload Picture
            <FileInput type="file" accept="image/*" onChange={handlePictureUpload} />
          </UploadButton>
        )}
        <ButtonContainer>
          {!editing && (
            <>
              <ReturnButton onClick={() => router.push('/')}>Return</ReturnButton>
              <SubmitButton onClick={handleEdit}>Edit</SubmitButton>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </>
          )}
          {editing && (
            <>
              <SubmitButton type="submit">Save Changes</SubmitButton>
              <ReturnButton onClick={handleCancel}>Cancel</ReturnButton>
            </>
          )}
        </ButtonContainer>
        <ImageContainer>
          {travelPlan.picture && <Image src={travelPlan.picture} alt="Plan Picture" />}
        </ImageContainer>
      </Form>
    </Container>
  );
};

export default TravelPlanDetail;
