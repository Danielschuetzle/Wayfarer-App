import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import WeatherForecast from '../../components/WeatherForecast/index';

const Card = styled.div`
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

const WeatherContainer = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 10px;

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

const CheckboxInput = styled.input`
  position: relative;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  margin-top: 2px;

  &:checked {
    background-color: #3f72af;
    border-color: #3f72af;
  }

  &:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 2px;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;

  span {
    font-size: 14px;
  }
`;

const AddActivityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AddActivityInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const AddActivityButton = styled.button`
  background-color: #3f72af;
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
  const [editing, setEditing] = useState(false);
  const [editedPlanName, setEditedPlanName] = useState('');
  const [editedStartDate, setEditedStartDate] = useState('');
  const [editedEndDate, setEditedEndDate] = useState('');
  const [editedActivities, setEditedActivities] = useState([]);
  const [editedTag, setEditedTag] = useState('');
  const [editedBudget, setEditedBudget] = useState('');
  const [editedPicture, setEditedPicture] = useState(null);
  const [newActivity, setNewActivity] = useState('');
  const [checkedActivities, setCheckedActivities] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCheckboxChange = (activity) => {
    if (checkedActivities.includes(activity)) {
      setCheckedActivities(checkedActivities.filter((item) => item !== activity));
    } else {
      setCheckedActivities([...checkedActivities, activity]);
    }
  };

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
  
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch(`/api/weather?city=${travelPlan?.location}`);

        const data = await response.json();
        const filteredData = data.data.filter((day) =>
          day.valid_date >= editedStartDate && day.valid_date <= editedEndDate
        );
        setWeatherData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };
  
    if (travelPlan?.location && editedStartDate && editedEndDate) {
      fetchWeatherForecast();
    }
  }, [travelPlan, editedStartDate, editedEndDate]);

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

  const handleAddActivity = () => {
    if (newActivity) {
      setEditedActivities([...editedActivities, newActivity]);
      setNewActivity('');
    }
  };

  if (!travelPlan) {
    return <p>Loading...</p>;
  }


  return (
    <Card>
      <Title>{travelPlan.planName}</Title>
      <WeatherContainer>
        {editing ? (
          <WeatherForecast
            location={travelPlan.location}
            startDate={editedStartDate}
            endDate={editedEndDate}
          />
        ) : (
          <WeatherForecast
            location={travelPlan.location}
            startDate={travelPlan.startDate}
            endDate={travelPlan.endDate}
          />
        )}
      </WeatherContainer>


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
        <RowContainer>
          <RowItem>
            {editedActivities.map((activity, index) => (
              <CheckboxLabel key={index}>
                <CheckboxInput
                  type="checkbox"
                  checked={checkedActivities.includes(activity)}
                  onChange={() => handleCheckboxChange(activity)}
                  disabled={!editing}
                />
                <span>{activity}</span>
              </CheckboxLabel>
            ))}
          </RowItem>
        </RowContainer>
        {editing && (
          <AddActivityContainer>
            <AddActivityInput
              type="text"
              placeholder="Add Activity"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
            <AddActivityButton type="button" onClick={handleAddActivity}>
              Add
            </AddActivityButton>
          </AddActivityContainer>
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
    </Card>
  );
};

export default TravelPlanDetail;
