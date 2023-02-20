import React, { useCallback } from 'react';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { Layout } from '../../components/layout';
import { Login } from '../../components/forms/login';
import { SignUpParamResult } from '../../services/auth';
import { useNavigate } from 'react-router';

const Page = styled.div`
  padding-top: 50px;
  height: 100%;
`;

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitSuccess = useCallback((data: SignUpParamResult) => {
    navigate('/');
  }, [navigate]);

  return (
    <Layout>
      <Page>
        <Container maxWidth='sm'>
          <Login onSubmitSuccess={handleSubmitSuccess} />
        </Container>
      </Page>
    </Layout>
  );
};

export default SignIn;
