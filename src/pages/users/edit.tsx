import React from 'react';
import { useNavigate } from 'react-router';

import { Dialog, Button } from '@mui/material';

const Edit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Dialog open={true}>
      user edit
      <div>
        <Button variant='contained' onClick={() => {
          navigate('/users', { replace: true });
        }}>Сохранить</Button>
        <Button variant='contained' color='error'>Отмена</Button>
      </div>
    </Dialog>
  );
};

export default Edit;
