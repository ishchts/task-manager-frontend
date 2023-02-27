import React, { useCallback } from 'react';
import { useNavigate, Routes, Route } from 'react-router';
import { Button } from '@mui/material';

import { Layout } from '../../components/layout';
import { PageTitle } from '../../components/page-title';
import { PageActionBar } from '../../components/page-action-bar/page-action-bar';
import { PageContent } from '../../components/page-content';

import { StatusesTable } from '../../components/statuses/statuses-table';

import StatusEdit from './edit';

const List: React.FC = () => {
  const navigate = useNavigate();

  const handleEditButton = useCallback((id: number) => {
    navigate(`${id}/edit`, { replace: true });
  }, [navigate]);

  return (
    <Layout>
      <PageTitle>
        Статусы
      </PageTitle>
      <PageActionBar>
        <Button
          href='new'
          variant='contained'
          color='primary'
        >
          Создать статус
        </Button>
      </PageActionBar>
      <PageContent>
        <StatusesTable onEditButton={handleEditButton} />
      </PageContent>
      <Routes>
        <Route path=':id/edit' element={<StatusEdit />} />
      </Routes>
    </Layout>
  );
};

export default List;
