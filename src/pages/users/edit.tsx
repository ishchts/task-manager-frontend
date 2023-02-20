import React from 'react';
import { useNavigate } from 'react-router';

import { EditUserDialog } from '../../components/user/edit-user-dialog/edit-user-dialog';

const UserEdit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <EditUserDialog
      open={true}
      onSave={() => {
        navigate('/users', { replace: true });
      }}
      onClose={() => {
        navigate('/users', { replace: true });
      }}
      onCancel={() => {
        navigate('/users', { replace: true });
      }}
    />
  );
};

export default UserEdit;
