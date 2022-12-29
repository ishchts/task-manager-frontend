import React from 'react';
import { useLocation } from 'react-router';
import { Layout } from '../../components/layout';

const NotFound: React.FC = () => {
  const location = useLocation();

  if (location.state.hideTemplate === true) {
    return (
      <div>404</div>
    );
  }

  return (
    <Layout>
      404
    </Layout>
  );
};

export default NotFound;
