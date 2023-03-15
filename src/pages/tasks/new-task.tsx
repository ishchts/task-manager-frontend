import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Layout } from '../../components/layout';
import { PageContent } from '../../components/page-content';
import { PageTitle } from '../../components/page-title';
import { AddTask } from '../../components/tasks/add-task';

const NewTask: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Layout>
      <PageTitle>Создание задачи</PageTitle>
      <PageContent>
        <AddTask
          onCancel={handleCancel}
          onSubmitSuccess={handleCancel}
        />
      </PageContent>
    </Layout>
  );
};

export default NewTask;
