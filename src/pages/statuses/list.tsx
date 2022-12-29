import React from 'react';
import { useNavigate, Routes, Route } from 'react-router';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Layout } from '../../components/layout';
import StatusEdit from './edit';
const List: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      statuses index 222
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
      <Routes>
        <Route path=':id/edit' element={<StatusEdit />} />
      </Routes>
    </Layout>
  );
};

export default List;
