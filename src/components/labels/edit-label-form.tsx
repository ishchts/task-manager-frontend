import React, { memo } from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

import { useEditLabelMutation, useGetLabelByIdQuery } from '../../services/labels';

import { LoadingOverlay } from '../loading-overlay';

type EditLabelFormProps = {
  labeldId: number
  onCancel?: () => void
  osSubmitSuccess?: () => void
  onSubmitError?: () => void
};

const EditLabelFormComp: React.FC<EditLabelFormProps> = ({
  labeldId,
  onCancel,
  osSubmitSuccess,
  onSubmitError
}) => {
  const {
    data = { name: '', id: -1 },
    isLoading
  } = useGetLabelByIdQuery({ id: labeldId });
  const [editLabel, { isLoading: isEditLabelLoading }] = useEditLabelMutation();

  const formik = useFormik({
    initialValues: data,
    validate: (values) => {
      if (values.name.length < 3) {
        return { name: 'Минимальная длинна наименования 3 символа' };
      }
    },
    onSubmit: async (values) => {
      try {
        await editLabel({
          id: values.id,
          name: values.name
        });

        if (osSubmitSuccess) {
          osSubmitSuccess();
        }
      } catch (error) {
        if (onSubmitError) {
          onSubmitError();
        }
      }
    },
    enableReinitialize: true
  });

  return (
    <>
      <LoadingOverlay open={isLoading || isEditLabelLoading} />
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
            Редактировать
          </Button>
          {' '}
          <Button
            variant='contained'
            color='error'
            disabled={formik.isSubmitting}
            onClick={onCancel}
          >
            Отмена
          </Button>
      </form>
    </>
  );
};

export const EditLabelForm = memo(EditLabelFormComp);
