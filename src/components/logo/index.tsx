import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@mui/material';

import withRouter, { withRouterProps } from '../HOC/with-router';
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

type LogoCompProps = withRouterProps;
const LogoComp: React.FC<LogoCompProps> = () => {
  return (
    <StyledLogo>
      <Link href="/">Менеджер задач</Link>
    </StyledLogo>
  );
};

export const Logo = withRouter(LogoComp);
