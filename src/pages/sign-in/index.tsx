import React, { useCallback } from 'react';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { Layout } from '../../components/layout';
import { Login, LoginProps } from '../../components/forms/login';

const Page = styled.div`
  padding-top: 50px;
  height: 100%;
`;
const SignIn: React.FC = () => {
  const handleSubmit: LoginProps['onSubmit'] = useCallback((values) => {
    console.log('values', values);
  }, []);

  return (
    <Layout>
      <Page>
        <Container maxWidth='sm'>
          <Login onSubmit={handleSubmit} />
        </Container>
      </Page>
    </Layout>
  );
};

export default SignIn;
