import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CalendarTitle = styled.h2`
  font-size: 20px;
  color: #3f72af;
`;

const CalendarControls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CalendarButton = styled.button`
  background-color: #3f72af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  margin: 0 5px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const CalendarCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isCurrentDate ? '#3f72af' : props.isBlocked ? '#1e90ff' : '#f5f8fb'};
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 100px;
  color: ${(props) => (props.isCurrentDate || props.isBlocked ? '#fff' : 'inherit')};
  opacity: ${(props) => (props.isBlocked ? 0.5 : 1)};
`;

const CalendarDay = styled.p`
  font-weight: bold;
`;

const CalendarDestinationList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  text-align: center;
`;

const CalendarDestinationItem = styled.li`
`;

const Calendar = ({ travelPlans }) => {
  const [date, setDate] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const currentMonth = date.toLocaleString('default', { month: 'long' });
  const currentYear = date.getFullYear();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(nextMonth);
  };

  const renderCalendarCells = () => {
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(date.getFullYear(), date.getMonth());

    const cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<CalendarCell key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isCurrentDay = currentDate.toDateString() === new Date().toDateString();

      let plansForThisDate = [];

      if (travelPlans && travelPlans.length > 0) {
        plansForThisDate = travelPlans.filter((plan) => {
          const planStartDate = new Date(plan.startDate);
          const planEndDate = new Date(plan.endDate);
          return currentDate >= planStartDate && currentDate <= planEndDate;
        });
      }

      const isBlocked = plansForThisDate.length > 0;

      cells.push(
        <CalendarCell key={day} isCurrentDate={isCurrentDay} isBlocked={isBlocked}>
          <CalendarDay>{day}</CalendarDay>
          {isBlocked && (
            <CalendarDestinationList>
              {plansForThisDate.map((plan, index) => (
                <CalendarDestinationItem key={index}>
                  {plan.planName}
                </CalendarDestinationItem>
              ))}
            </CalendarDestinationList>
          )}
        </CalendarCell>
      );
    }

    return cells;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>{currentMonth} {currentYear}</CalendarTitle>
        <CalendarControls>
          <CalendarButton onClick={handlePrevMonth}>Prev</CalendarButton>
          <CalendarButton onClick={handleNextMonth}>Next</CalendarButton>
        </CalendarControls>
      </CalendarHeader>
      <CalendarGrid>{renderCalendarCells()}</CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
