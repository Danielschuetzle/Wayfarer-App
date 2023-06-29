import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 400px;
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

const Navigation = () => {
  const router = useRouter();

  return (
    <NavigationContainer>
      <NavButton onClick={() => router.push('/')}>Home</NavButton>
      <NavButton onClick={() => router.push('/calendar')}>Calendar</NavButton>
    </NavigationContainer>
  );
};

export default Navigation;
