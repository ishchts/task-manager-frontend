import React, { useState, memo, useCallback } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ConfirmationDialog } from '../../confirmation-dialog';

import { selectUserById, useRemoveUserMutation } from '../../../services/users';
import { useAppSelector } from '../../../store';
import { useAuth } from '../../../hooks/use-auth';
import { LoadingOverlay } from '../../loading-overlay';

type RemoveUserDialogProps = {
  userId: number
  disabled?: boolean
};

const RemoveUserDialogComp: React.FC<RemoveUserDialogProps> = ({ userId, disabled }) => {
  const [removeUser, { isLoading }] = useRemoveUserMutation();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const user = useAppSelector((state) => selectUserById(state, userId));
  const { logout } = useAuth();

  const handleClose = useCallback(() => {
    setConfirmingUserDeletion(false);
  }, []);

  const handleConfirm = useCallback(() => {
    removeUser({ id: userId }).then(() => {
      logout();
    }).finally(() => {
      setConfirmingUserDeletion(false);
    });
  }, [logout, removeUser, userId]);

  return (
    <>
      <LoadingOverlay open={isLoading} invisible={true} />
      <Button
        variant='outlined'
        color='error'
        startIcon={<DeleteIcon />}
        disabled={disabled}
        onClick={() => {
          setConfirmingUserDeletion(true);
        }}
      >
        Удалить
      </Button>
      <ConfirmationDialog
        content={`Вы действительно хотите удалить ${user?.firstName ?? ''} ${user?.lastName ?? ''} ?`}
        open={confirmingUserDeletion}
        onClose={handleClose}
        onCancel={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export const RemoveUserDialog = memo(RemoveUserDialogComp);
