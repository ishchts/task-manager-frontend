import React from 'react';

import { StyledWrapper, StyledHeader, StyledHeaderContainer, StyledContent, StyledFooter } from './components/layout';
import { Logo } from './components/logo';
import { Nav } from './components/nav';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <StyledWrapper>
        <StyledHeader>
          <StyledHeaderContainer maxWidth={false}>
            <Logo />
            <Nav />
          </StyledHeaderContainer>
        </StyledHeader>
        <StyledContent>
          content
        </StyledContent>
        <StyledFooter>
          footer
        </StyledFooter>
      </StyledWrapper>
    </React.Fragment>
  );
};
