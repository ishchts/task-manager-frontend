import React from 'react';
import styled from '@emotion/styled';

const StyledActions = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const StyledActionItem = styled('div')`
  margin-right: 10px;
`;

type PageActionBarProps = {
  children: React.ReactNode
};

export const PageActionBar: React.FC<PageActionBarProps> = ({ children }) => {
  return (
      <StyledActions>
        {React.Children.map(children, (child) => (
          <StyledActionItem>
            {child}
          </StyledActionItem>
        ))}
      </StyledActions>
  );
};
