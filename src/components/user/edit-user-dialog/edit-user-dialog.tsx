import React, { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { createSelector, EntityState } from '@reduxjs/toolkit';

import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent
} from '@mui/material';

import { useGetUsersQuery, useEditUserMutation } from '../../../services/users';
import { User } from '../../../store/features/users/user-slice';

import { EditUserForm, EditUserFormProps } from '../edit-user-form/edit-user-form';
import { LoadingOverlay } from '../../loading-overlay';

type EditUserDialogProps = DialogProps & {
  onSave?: () => void
  onCancel?: () => void
};

const EditUserDialogComp: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  onSave,
  onCancel
}) => {
  const { id: userId } = useParams();
  const [updateUser, { isLoading: isUpdateUserLoading }] = useEditUserMutation();

  const selectUser = useMemo(() => {
    return createSelector(
      (result: EntityState<User> | undefined) => result,
      (res: EntityState<User> | undefined, userId: number) => userId,
      (data, userId) => data?.entities[userId]
    );
  }, []);

  const { selectedUser } = useGetUsersQuery(undefined, {
    selectFromResult: (result) => {
      return {
        ...result,
        selectedUser: selectUser(result.data, Number(userId))
      };
    }
  });

  const handleSubmit = useCallback<EditUserFormProps['onSubmit']>(async (values) => {
    await updateUser(values);
    if (onSave) {
      onSave();
    }
  }, [onSave, updateUser]);

  return (
    <>
      <LoadingOverlay open={isUpdateUserLoading} invisible={true} />
      <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать пользователя</DialogTitle>
      <DialogContent>
        {selectedUser && (
          <EditUserForm
            onSubmit={handleSubmit}
            onCancel={onCancel}
            initialValues={selectedUser}
          />
        )}
      </DialogContent>
    </Dialog>
    </>

  );
};

export const EditUserDialog = memo(EditUserDialogComp);
