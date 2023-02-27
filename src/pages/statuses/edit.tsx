import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

import { useAppSelector } from '../../store';
import { selectStatusById } from '../../services/statuses';
import { EditStatusForm } from '../../components/statuses/edit-status-form';

const StatusEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const closeDialog = useCallback(() => {
    navigate('/statuses', { replace: true });
  }, [navigate]);
  const selectedStatus = useAppSelector((state) => selectStatusById(state, Number(id)));

  return (
    <>
      <Dialog open={true} fullWidth={true} onClose={closeDialog}>
      <DialogTitle>Редактировать статус</DialogTitle>
      <DialogContent>
        {selectedStatus && (
          <EditStatusForm
            initialValues={selectedStatus}
            onSubmitSuccess={closeDialog}
            onCancel={closeDialog}
          />
        )}
      </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusEdit;
