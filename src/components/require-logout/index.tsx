import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../store';
import { isAuth } from '../../store/auth/auth-slice';

type RequireLogoutProps = {
  children: JSX.Element
};
export const RequireLogout: React.FC<RequireLogoutProps> = ({ children }) => {
  const isAuthUser = useAppSelector(isAuth);

  if (isAuthUser) {
    return (<Navigate to='/' />);
  }

  return children;
};
