import React, { memo, useCallback } from 'react';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';

import { useCreateNewUserMutation } from '../../../services/users';

import { LoadingOverlay } from '../../loading-overlay';
import { NewUserForm, NewUserFormProps } from '../new-user-form/new-user-form';

type NewUserDialogProps = DialogProps & {
  onSubmitStart?: () => void
  onSuccessSubmit?: () => void
};

const NewUserDialogComp: React.FC<NewUserDialogProps> = ({
  open,
  onClose,
  onSubmitStart,
  onSuccessSubmit
}) => {
  const [createNewUser, newUserMetadata] = useCreateNewUserMutation();

  const handleNewUserSubmit = useCallback<NewUserFormProps['onSubmit']>(async (values, helpers) => {
    try {
      if (onSubmitStart) {
        onSubmitStart();
      }
      const res = await createNewUser(values).unwrap();
      if (onSuccessSubmit) {
        onSuccessSubmit();
      }
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  }, [createNewUser, onSubmitStart, onSuccessSubmit]);

  return (
    <>
      <LoadingOverlay open={newUserMetadata.isLoading} />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Создать пользователя</DialogTitle>
        <DialogContent>
          <NewUserForm onSubmit={handleNewUserSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const NewUserDialog = memo(NewUserDialogComp);
