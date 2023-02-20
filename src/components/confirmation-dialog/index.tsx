import React, { memo } from 'react';
import { Dialog, DialogProps, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type ConfirmationDialogProps = DialogProps & {
  onCancel: () => void
  onConfirm: () => void
  title?: string
  content?: string
};

const ConfirmationDialogComp: React.FC<ConfirmationDialogProps> = ({
  onClose,
  onCancel,
  onConfirm,
  open,
  title = 'Удалить пользователя',
  content = 'Вы действительно хотите удалить пользователя?',
  ...other
}) => {
  return (
    <Dialog
      {...other}
      open={open}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {content}
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          type='button'
          color='error'
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          variant='contained'
          onClick={onConfirm}
        >
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmationDialog = memo(ConfirmationDialogComp);
