import React, { memo } from 'react';
import { Dialog, DialogProps, DialogTitle, DialogContent } from '@mui/material';

type NewLabelDialogProps = Omit<DialogProps, 'open'> & {

};

const NewLabelDialogComp: React.FC<NewLabelDialogProps> = ({ onClose, children }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogTitle>Создать метку</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export const NewLabelDialog = memo(NewLabelDialogComp);
