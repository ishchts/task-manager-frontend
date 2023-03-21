import React, { useState, memo, useCallback } from 'react';
import { Button } from '@mui/material';

import { ConfirmationDialog } from '../confirmation-dialog';
import { useRemoveTaskByIdMutation } from '../../services/tasks';

type RemoveTaskDialogProps = {
  taskId: number
  taskName: string
  onSubmitStart?: () => void
  onSubmitSuccess?: () => void
  onSubmitError?: () => void
};

const RemoveTaskDialogComp: React.FC<RemoveTaskDialogProps> = ({
  taskId,
  taskName,
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError
}) => {
  const [removeTask] = useRemoveTaskByIdMutation();
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (onSubmitStart) {
      onSubmitStart();
    }
    removeTask(taskId)
      .then(() => {
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      })
      .catch(() => {
        if (onSubmitError) {
          onSubmitError();
        }
      });
    setOpen(false);
  }, [onSubmitError, onSubmitStart, onSubmitSuccess, removeTask, taskId]);

  return (
    <>
      <Button
        variant='contained'
        color='error'
        onClick={handleOpen}
      >
        Удалить
      </Button>
      <ConfirmationDialog
          title='Удалить задачу'
          content={`Вы действительно хотите удалить ${taskName} ?`}
          open={open}
          onClose={handleClose}
          onCancel={handleClose}
          onConfirm={handleConfirm}
      />
    </>
  );
};

export const RemoveTaskDialog = memo(RemoveTaskDialogComp);
