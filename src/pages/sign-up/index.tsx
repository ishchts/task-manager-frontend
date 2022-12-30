import React, { useCallback } from 'react';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

import { Layout } from '../../components/layout';
import { NewUser, NewUserProps } from '../../components/forms/new-user';

const Page = styled.div`
  padding-top: 50px;
  height: 100%;
`;

const SignUp: React.FC = () => {
  const handleSubmit: NewUserProps['onSubmit'] = useCallback((values) => {
    console.log('values', values);
  }, []);

  return (
    <Layout>
      <Page>
        <Container maxWidth='sm'>
          <NewUser onSubmit={handleSubmit}/>
        </Container>
      </Page>
    </Layout>
  );
};

export default SignUp;
