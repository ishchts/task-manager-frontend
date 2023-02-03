import React, { useCallback } from 'react';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

import { Layout } from '../../components/layout';
import { NewUserForm, NewUserFormProps } from '../../components/user/new-user-form/new-user-form';

const Page = styled.div`
  padding-top: 50px;
  height: 100%;
`;

const SignUp: React.FC = () => {
  const handleSubmit: NewUserFormProps['onSubmit'] = useCallback((values) => {
    console.log('values', values);
  }, []);

  return (
    <Layout>
      <Page>
        <Container maxWidth='sm'>
          <NewUserForm onSubmit={handleSubmit}/>
        </Container>
      </Page>
    </Layout>
  );
};

export default SignUp;
