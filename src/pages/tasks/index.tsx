import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

import { Layout } from '../../components/layout';
import { PageActionBar } from '../../components/page-action-bar/page-action-bar';
import { PageTitle } from '../../components/page-title';
import { PageContent } from '../../components/page-content';
import { TaskTable } from '../../components/tasks/task-table';

const Tasks: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateButton = useCallback(() => {
    navigate('new');
  }, [navigate]);

  return (
    <Layout>
      <PageTitle>
        Задачи
      </PageTitle>
      <PageActionBar>
        <Button
            onClick={handleCreateButton}
            variant='contained'
            color='primary'
          >
            Создать
          </Button>
      </PageActionBar>
      <PageContent>
        <TaskTable />
      </PageContent>
    </Layout>
  );
};

export default Tasks;
