import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/use-auth';

type RequireAuthProps = {
  children: JSX.Element
  hideTemplate?: boolean
};

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, hideTemplate }) => {
  const { isAuthUser } = useAuth();

  if (!isAuthUser) {
    return (<Navigate to='/404' replace state={{ hideTemplate }} />);
  }

  return children;
};
