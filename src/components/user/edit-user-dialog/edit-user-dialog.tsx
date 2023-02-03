import React, { memo } from 'react';

import {
  Dialog,
  DialogProps,
  Button,
  DialogTitle,
  DialogContent
} from '@mui/material';

import { NewUserForm } from '../new-user-form/new-user-form';

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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать пользователя</DialogTitle>
      <DialogContent>
        <NewUserForm
          onSubmit={() => {
            console.log(222);
          }}
        />
        <Button
            variant='contained'
            onClick={onSave}
          >
            Сохранить
          </Button>
          {' '}
          <Button
            variant='contained'
            color='error'
            onClick={onCancel}
          >
            Отмена
          </Button>
      </DialogContent>
    </Dialog>
  );
};

export const EditUserDialog = memo(EditUserDialogComp);
