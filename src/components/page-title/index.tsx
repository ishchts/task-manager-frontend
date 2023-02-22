import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import styled from '@emotion/styled';

const StyledPageTitle = styled(Typography)`
margin-top: 20px;
margin-bottom: 20px;
`;

type PageTitleProps = TypographyProps;

export const PageTitle: React.FC<PageTitleProps> = ({
  variant = 'h4',
  variantMapping = { h4: 'h1' },
  children,
  ...props
}) => {
  return (
      <StyledPageTitle
        {...props}
        variant={variant}
        variantMapping={variantMapping}
      >
        {children}
      </StyledPageTitle>
  );
};
