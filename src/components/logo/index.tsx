import React from 'react';
import styled from '@emotion/styled';

export const StyledLogo = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;

export const Logo: React.FC = () => {
  return (
    <StyledLogo>
      Task Manager
    </StyledLogo>
  );
};
