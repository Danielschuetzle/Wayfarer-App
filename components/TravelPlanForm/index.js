import { useState } from "react";

const TravelPlanForm = ({ addTravelPlan }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activity, setActivity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addTravelPlan({ name, startDate, endDate, activity });
    setName("");
    setStartDate("");
    setEndDate("");
    setActivity("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Activity"
        required
      />
      <button type="submit">Save Travel Plan</button>
    </form>
  );
};

export default TravelPlanForm;
