import React from 'react';
import { useFormik } from 'formik';

import { TextField, Button } from '@mui/material';
import { useCreateStatusMutation } from '../../services/statuses';
import { LoadingOverlay } from '../../components/loading-overlay';

type NewStatusFormProps = {
  onSubmitStart?: () => void
  onSubmitSuccess?: () => void
  onSubmitError?: () => void
};

export const NewStatusForm: React.FC<NewStatusFormProps> = ({
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError
}) => {
  const [createStatus, { isLoading }] = useCreateStatusMutation();
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: async (values) => {
      if (onSubmitStart) {
        onSubmitStart();
      }

      try {
        await createStatus(values);
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
        <Button variant='contained' type='submit'>Создать</Button>
      </form>
    </>

  );
};
