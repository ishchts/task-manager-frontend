import React from 'react';
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

const StyledContainer = styled(Container)`
  height: 100%;
`;

export const StyledHeaderContainer = styled(StyledContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StyledMain = styled.main`
  flex: 1 0 auto;
`;

export const StyledFooter = styled.footer`
  flex: 0 0 auto;
  background-color: #e0e0e0;
  height: 60px;
`;

type LayoutProps = {
  children: React.ReactNode
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledHeaderContainer maxWidth={false}>
          <Logo />
          <Nav />
        </StyledHeaderContainer>
      </StyledHeader>
      <StyledMain>
        <StyledContainer maxWidth={false}>
          {children}
        </StyledContainer>
      </StyledMain>
      <StyledFooter>
        <StyledContainer maxWidth={false}>
          footer
        </StyledContainer>
      </StyledFooter>
  </StyledWrapper>
  );
};
