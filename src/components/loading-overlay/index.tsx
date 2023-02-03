import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

type LoadingOverlayProps = {
  open?: boolean
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open = true }) => {
  return (
      <Backdrop open={open} sx={{ color: '#fff', zIndex: 10000, position: 'absolute' }}>
        <CircularProgress color='inherit' />
      </Backdrop>
  );
};
