import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #3f72af;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled.a`
  color: #fff;
  font-size: 18px;
  text-decoration: none;
  margin: 0 10px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const Navigation = () => {
  const router = useRouter();

  return (
    <NavigationContainer>
      <NavLink onClick={() => router.push('/')}>Home</NavLink>
      <NavLink onClick={() => router.push('/calendar')}>Calendar</NavLink>
    </NavigationContainer>
  );
};

export default Navigation;
