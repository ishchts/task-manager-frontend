import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Container } from '@mui/material';
import styled from '@emotion/styled';

import { Layout } from '../../components/layout';
import { NewUserForm } from '../../components/user/new-user-form/new-user-form';

const Page = styled.div`
  padding-top: 50px;
  height: 100%;
`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitSuccess = useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);

  return (
    <>
      <Layout>
        <Page>
          <Container maxWidth='sm'>
            <NewUserForm onSubmitSuccess={handleSubmitSuccess}/>
          </Container>
        </Page>
      </Layout>
    </>
  );
};

export default SignUp;
