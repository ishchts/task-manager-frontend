import React from 'react';
import { useNavigate, Routes, Route } from 'react-router';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Layout } from '../../components/layout';
import { PageTitle } from '../../components/page-title';
import { PageActionBar } from '../../components/page-action-bar/page-action-bar';
import { PageContent } from '../../components/page-content';

import { StatusesTable } from '../../components/statuses/statuses-table';

import StatusEdit from './edit';

const List: React.FC = () => {
  const navigate = useNavigate();

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
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            navigate('1/edit', { replace: true });
          }}
        >
          Изменить
        </Button>
        <Button
          variant='outlined'
          color='error'
          startIcon={<DeleteIcon />}
        >
          Удалить
        </Button>
      </PageActionBar>
      <PageContent>
        <StatusesTable />
      </PageContent>
      <Routes>
        <Route path=':id/edit' element={<StatusEdit />} />
      </Routes>
    </Layout>
  );
};

export default List;
