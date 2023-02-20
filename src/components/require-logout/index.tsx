import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/use-auth';

type RequireLogoutProps = {
  children: JSX.Element
};
export const RequireLogout: React.FC<RequireLogoutProps> = ({ children }) => {
  const { isAuthUser } = useAuth();

  if (isAuthUser) {
    return (<Navigate to='/' />);
  }

  return children;
};
