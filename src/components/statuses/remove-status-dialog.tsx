import React, { memo, useState, useCallback } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { selectStatusById, useRemoveStatusMutation } from '../../services/statuses';
import { ConfirmationDialog } from '../confirmation-dialog';
import { useAppSelector } from '../../store';

type RemoveStatusDialogProps = {
  statusId: number
  onConfirmStart?: () => void
  onConfirmFinish?: () => void
};

const RemoveStatusDialogComp: React.FC<RemoveStatusDialogProps> = ({ statusId, onConfirmStart, onConfirmFinish }) => {
  const [removeStatus] = useRemoveStatusMutation();
  const [open, setOpen] = useState(false);
  const selectedStatus = useAppSelector((state) => selectStatusById(state, Number(statusId)));

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirmStart) {
      onConfirmStart();
    }

    removeStatus(Number(statusId)).finally(() => {
      setOpen(false);
      if (onConfirmFinish) {
        onConfirmFinish();
      }
    });
  }, [onConfirmFinish, onConfirmStart, removeStatus, statusId]);

  return (
    <>
        <Button
          variant='outlined'
          color='error'
          startIcon={<DeleteIcon />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Удалить
        </Button>
        <ConfirmationDialog
          title='Удалить статус'
          content={`Вы действительно хотите удалить ${selectedStatus?.name ?? ''} ?`}
          open={open}
          onClose={handleClose}
          onCancel={handleClose}
          onConfirm={handleConfirm}
      />
    </>
  );
};

export const RemoveStatusDialog = memo(RemoveStatusDialogComp);
