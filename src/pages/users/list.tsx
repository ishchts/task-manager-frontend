import React from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Layout } from '../../components/layout';

import { useGetUsersQuery } from '../../services/users';

const List: React.FC = () => {
  const navigate = useNavigate();
  const req = useGetUsersQuery();
  console.log('users req', req);
  const { data, error, isLoading } = req;
  if (isLoading) {
    return (
      <div>
        isLoading
      </div>
    );
  }

  if (error) {
    return (
      <div>
        error
      </div>
    );
  }
  console.log('users data', data);
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
