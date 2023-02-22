import React from 'react';
import styled from '@emotion/styled';

const StyledContent = styled('div')`
  height: calc(100% - 168px);
`;

export const PageContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
      <StyledContent>
        {children}
      </StyledContent>
  );
};
