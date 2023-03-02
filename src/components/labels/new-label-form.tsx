import React, { memo } from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

import { useCreateLabelMutation } from '../../services/labels';
import { LoadingOverlay } from '../loading-overlay';

type NewLabelFormProps = {
  onSubmitSuccess?: () => void
};
const NewLabelFormComp: React.FC<NewLabelFormProps> = ({
  onSubmitSuccess
}) => {
  const [createLabel, { isLoading }] = useCreateLabelMutation();

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validate: (values) => {
      if (values.name.length < 3) {
        return { name: 'Минимальная длинна наименования 3 символа' };
      }
    },
    onSubmit: async (values) => {
      try {
        await createLabel(values);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        console.error(error);
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
          <Button
            variant='contained'
            type='submit'
            disabled={formik.isSubmitting}
          >
            Создать
          </Button>
      </form>
    </>
  );
};

export const NewLabelForm = memo(NewLabelFormComp);
