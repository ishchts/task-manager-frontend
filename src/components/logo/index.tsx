import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const StyledLogo = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

export const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <NavLink to="/">Менеджер задач</NavLink>
    </StyledLogo>
  );
};
