import React from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Layout } from '../../components/layout';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const List: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      Users list
      <div>
        <Button href='new' variant='contained' color='primary'>Создать</Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            navigate('1/edit', { replace: true });
          }}
        >Редактировать</Button>
        <Button variant='outlined' color='error' startIcon={<DeleteIcon />} >Удалить</Button>
      </div>
      <Outlet />
    </Layout>
  );
};

export default List;
