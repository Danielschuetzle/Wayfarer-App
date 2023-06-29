import React from 'react';
import Calendar from '../components/Calendar';
import exampleTravelPlans from '../data/exampleTravelPlans';
import Navigation from '../components/Navigation';


const CalendarPage = () => {
  return (
    <div>
      <Calendar travelPlans={exampleTravelPlans} />
      <Navigation />
    </div>
    
  );
};

export default CalendarPage;
