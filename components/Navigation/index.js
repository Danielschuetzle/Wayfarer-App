import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #3f72af;
  padding: 10px 0;
`;

const NavButton = styled.button`
  flex: 1;
  color: #fff;
  background-color: #3f72af;
  border: none;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #2d5d84;
  }
`;

const Navigation = ({ toggleCalendar }) => {
  const router = useRouter();

  return (
    <NavigationContainer>
      <NavButton onClick={() => router.push('/')}>Home</NavButton>
      <NavButton onClick={toggleCalendar}>Calendar</NavButton>
    </NavigationContainer>
  );
};

export default Navigation;
