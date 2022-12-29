import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../store';
import { isAuth } from '../../store/auth/auth-slice';
import { Layout } from '../../components/layout';

const SignIn: React.FC = () => {
  const isAuthUser = useAppSelector(isAuth);

  if (isAuthUser) {
    return <Navigate to='/' />;
  }

  return (
    <Layout>
      SignIn
    </Layout>
  );
};

export default SignIn;
