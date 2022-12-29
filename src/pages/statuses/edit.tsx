import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Dialog } from '@mui/material';

const StatusEdit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Dialog open={true}>
        status edit
        <div>
          <Button variant='contained' onClick={() => {
            navigate('/statuses', { replace: true });
          }}>Сохранить</Button>
          <Button variant='contained' color='error'>Отмена</Button>
        </div>
      </Dialog>
    </>
  );
};

export default StatusEdit;
