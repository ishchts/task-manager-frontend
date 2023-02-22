import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../../components/layout';
import { PageTitle } from '../../components/page-title';

import { NewStatusForm } from '../../components/statuses/new-status-form';

const StatusNew = () => {
  const navigate = useNavigate();

  const handleSubmitSuccess = useCallback(() => {
    navigate('/statuses');
  }, [navigate]);

  return (
    <Layout>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <PageTitle>
          Создание статуса
        </PageTitle>
        <NewStatusForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </Layout>
  );
};

export default StatusNew;
