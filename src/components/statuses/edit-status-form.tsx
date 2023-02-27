import React, { memo } from 'react';
import { useFormik } from 'formik';

import { Button, TextField } from '@mui/material';

import { useEditStatusByIdMutation } from '../../services/statuses';
import { LoadingOverlay } from '../loading-overlay';

type EditStatusFormProps = {
  initialValues?: {
    id: number
    name: string
  }
  onSubmitStart?: () => void
  onSubmitSuccess?: () => void
  onSubmitError?: () => void
  onCancel?: () => void
};

const EditStatusFormComp: React.FC<EditStatusFormProps> = ({
  initialValues = {
    id: -1,
    name: ''
  },
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError,
  onCancel
}) => {
  const [editStatusById, { isLoading }] = useEditStatusByIdMutation();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (onSubmitStart) {
        onSubmitStart();
      }

      try {
        await editStatusById(values);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        if (onSubmitError) {
          onSubmitError();
        }
      }
    },
    validate: (values) => {
      if (values.name.trim().length < 3) {
        return { name: 'Минимальная длинна наименования 3 символа' };
      }
    }
  });

  return (
    <>
      <LoadingOverlay open={isLoading} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name='name'
          fullWidth
          label='Наименование'
          margin='normal'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <Button variant='contained' type='submit'>Сохранить</Button>
        {' '}
        <Button variant='contained' color='error' onClick={onCancel}>Отмена</Button>
      </form>
    </>
  );
};

export const EditStatusForm = memo(EditStatusFormComp);
