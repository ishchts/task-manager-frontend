import React, { memo, useCallback, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';

import { useDeleteLabelMutation } from '../../services/labels';

import { ConfirmationDialog } from '../confirmation-dialog';
import { LoadingOverlay } from '../loading-overlay';

type DeleteLabelProps = {
  labelId: number
  buttonProps?: ButtonProps
};

const DeleteLabelComp: React.FC<DeleteLabelProps> = ({
  labelId,
  buttonProps = {}
}) => {
  const [deleteLabel, { isLoading }] = useDeleteLabelMutation();
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    void deleteLabel(labelId)
      .then(() => {
        setOpen(false);
      });
  }, [deleteLabel, labelId]);

  return (
    <>
      <LoadingOverlay open={isLoading} invisible={true} />
      <Button
        {...buttonProps}
        variant='contained'
        color='error'
        onClick={handleOpen}
      >
        Удалить
      </Button>
      <ConfirmationDialog
          title='Удалить метку'
          content='Вы действительно хотите удалить метку ?'
          open={open}
          onClose={handleClose}
          onCancel={handleClose}
          onConfirm={handleConfirm}
      />
    </>
  );
};

export const DeleteLabel = memo(DeleteLabelComp);
