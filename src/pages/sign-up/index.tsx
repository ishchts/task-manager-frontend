import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../store';
import { isAuth } from '../../store/auth/auth-slice';
import { Layout } from '../../components/layout';

const SignUp: React.FC = () => {
  const isAuthUser = useAppSelector(isAuth);

  if (isAuthUser) {
    return <Navigate to='/' />;
  }

  return (
    <Layout>
      SignUp
    </Layout>
  );
};

export default SignUp;
