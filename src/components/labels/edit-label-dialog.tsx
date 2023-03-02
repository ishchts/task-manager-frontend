import React, { memo } from 'react';
import { Dialog, DialogProps, DialogTitle, DialogContent } from '@mui/material';
import { useParams } from 'react-router';

import { EditLabelForm } from './edit-label-form';

type EditLabelDialogProps = Omit<DialogProps, 'open'> & {
  onCancel?: () => void
};

const EditLabelDialogComp: React.FC<EditLabelDialogProps> = ({ onClose, onCancel }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogTitle>Редактировать метку</DialogTitle>
      <DialogContent>
        <EditLabelForm
          labeldId={Number(id)}
          onCancel={onCancel}
          osSubmitSuccess={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export const EditLabelDialog = memo(EditLabelDialogComp);
