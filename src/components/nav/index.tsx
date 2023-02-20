import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import styled from '@emotion/styled';

import { useAuth } from '../../hooks/use-auth';

const StyledNavList = styled(List)`
  display: flex;
  flex-wrap: wrap;
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    opacity: 1;
  }
  opacity: 0.7;
  color: white;
  font-weight: 500;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  opacity: 0.7;
  color: white;
  font-weight: 500;
  text-decoration: none;
`;

const StyledListItem = styled(ListItem)`
  width: auto;
`;

export const Nav: React.FC = () => {
  const { isAuthUser, logout } = useAuth();

  return (
    <StyledNavList>
      <StyledListItem><StyledNavLink to="/users">Пользователи</StyledNavLink></StyledListItem>
      {isAuthUser && (
        <StyledListItem><StyledNavLink to="/statuses">Статусы</StyledNavLink></StyledListItem>
      )}
      {isAuthUser && (
        <StyledListItem><StyledNavLink to="/labels">Метки</StyledNavLink></StyledListItem>
      )}
      {isAuthUser && (
        <StyledListItem><StyledNavLink to="/tasks">Задачи</StyledNavLink></StyledListItem>
      )}
      {!isAuthUser && (
        <StyledListItem><StyledNavLink to="/sign-in">Вход</StyledNavLink></StyledListItem>
      )}
      {!isAuthUser && (
        <StyledListItem><StyledNavLink to="/sign-up">Регистрация</StyledNavLink></StyledListItem>
      )}
      {isAuthUser && (
        <StyledListItem>
            <StyledLink
              to="/"
              onClick={logout}
            >
              Выход
            </StyledLink>
          </StyledListItem>
      )}
    </StyledNavList>
  );
};
