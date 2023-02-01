import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../store';
import { isAuth } from '../../store/auth/auth-slice';

type RequireAuthProps = {
  children: JSX.Element
  hideTemplate?: boolean
};

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, hideTemplate }) => {
  const isAuthUser = useAppSelector(isAuth);

  if (!isAuthUser) {
    return (<Navigate to='/404' replace state={{ hideTemplate }} />);
  }

  return children;
};
