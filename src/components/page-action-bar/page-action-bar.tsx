import React from 'react';
import styled from '@emotion/styled';

const StyledActions = styled('div')`
margin-top: 20px;
margin-bottom: 30px;
a {
  margin-right: 10px;
}
button {
  margin-right: 10px;
}
`;

type PageActionBarProps = {
  children: React.ReactNode
};

export const PageActionBar: React.FC<PageActionBarProps> = ({ children }) => {
  return (
      <StyledActions>
        {children}
      </StyledActions>
  );
};
