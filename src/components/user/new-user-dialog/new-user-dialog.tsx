import React, { memo } from 'react';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';

import { NewUserForm, NewUserFormProps } from '../new-user-form/new-user-form';

type NewUserDialogProps = DialogProps & NewUserFormProps & {
  onCancel?: () => void
};

const NewUserDialogComp: React.FC<NewUserDialogProps> = ({
  open,
  onClose,
  onCancel,
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Создать пользователя</DialogTitle>
        <DialogContent>
          <NewUserForm
            onSubmitStart={onSubmitStart}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitError={onSubmitError}
            onCancel={onCancel}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const NewUserDialog = memo(NewUserDialogComp);
