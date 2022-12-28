import React from 'react';
import { Outlet } from 'react-router';
import styled from '@emotion/styled';
import { Container } from '@mui/system';

import { Logo } from '../logo';
import { Nav } from '../nav';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledHeader = styled.header`
  min-height: 70px;
  background-color: #1976d2;
`;

export const StyledHeaderContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
`;

export const StyledMain = styled.main`
  flex: 1 0 auto;
`;

export const StyledFooter = styled.footer`
  flex: 0 0 auto;
  background-color: #e0e0e0;
  height: 60px;
`;

export const Layout: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledHeaderContainer maxWidth={false}>
          <Logo />
          <Nav />
        </StyledHeaderContainer>
      </StyledHeader>
      <StyledMain>
        <Outlet />
      </StyledMain>
      <StyledFooter>
        footer
      </StyledFooter>
  </StyledWrapper>
  );
};
