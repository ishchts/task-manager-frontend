import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, List, ListItem } from '@mui/material';
import styled from '@emotion/styled';

const StyledNavList = styled(List)`
  display: flex;
`;

const StyledNavLink = styled(RouterLink)`
  color: black !important;
`;

export const Nav: React.FC = () => {
  return (
    <StyledNavList>
      {/* // @ts-expect-error */}
      <ListItem><Link component={StyledNavLink} to="/users">Пользователи</Link></ListItem>
      <ListItem><Link component={RouterLink} to="/sign-in">Вход</Link></ListItem>
      <ListItem><Link component={RouterLink} to="/sign-up">Регистрация</Link></ListItem>
    </StyledNavList>
  );
};
