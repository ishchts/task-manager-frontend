import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import styled from '@emotion/styled';
import { useAppSelector } from '../../store';
import { isAuth } from '../../store/auth/auth-slice';

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

const StyledListItem = styled(ListItem)`
  width: auto;
`;

export const Nav: React.FC = () => {
  const isAuthUser = useAppSelector(isAuth);

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
        <StyledListItem><StyledNavLink to="/sign-out">Выход</StyledNavLink></StyledListItem>
      )}
    </StyledNavList>
  );
};
