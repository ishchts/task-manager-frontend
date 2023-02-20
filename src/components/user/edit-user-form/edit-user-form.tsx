import React, { memo } from 'react';
import { useFormik, FormikConfig } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';

import { Button, TextField } from '@mui/material';

const StyledForm = styled.form``;

const StyledFormFooter = styled.div`
  margin-top: 20px;
`;

const nameValidation = yup
  .string()
  .required()
  .max(40)
  .min(3)
  .test('name', 'Please enter valid first name', (value) => {
    if (!value) {
      return false;
    }
    const firstLetter = value[0];
    if (firstLetter !== firstLetter.toLocaleUpperCase()) {
      return false;
    }

    const hasNumber = value.split('').some(el => !isNaN(Number(el)));

    return !hasNumber;
  });

const validationSchema = yup.object().shape({
  firstName: nameValidation,
  lastName: nameValidation,
  email: yup.string()
    .required()
    .email()
});

const defaultlValues = {
  id: -1,
  firstName: '',
  lastName: '',
  email: '',
  createdAt: ''
};

export type EditUserFormProps = {
  onSubmit: FormikConfig<typeof defaultlValues>['onSubmit']
  onCancel?: () => void
  initialValues?: typeof defaultlValues
};

const EditUserFormComp: React.FC<EditUserFormProps> = ({
  onSubmit,
  onCancel,
  initialValues = defaultlValues
}) => {
  const formik = useFormik<typeof defaultlValues>({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <TextField
        margin='normal'
        variant="outlined"
        fullWidth={true}
        label="Имя"
        name="firstName"
        value={formik.values.firstName}
        error={Boolean(formik.errors.firstName)}
        helperText={formik.errors.firstName}
        onChange={formik.handleChange}
      />
      <TextField
        margin='normal'
        variant="outlined"
        fullWidth={true}
        label="Фамилия"
        name="lastName"
        value={formik.values.lastName}
        error={Boolean(formik.touched.lastName && formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        onChange={formik.handleChange}
      />
      <TextField
        margin='normal'
        variant="outlined"
        fullWidth={true}
        label="Email"
        name="email"
        value={formik.values.email}
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onChange={formik.handleChange}
      />
      <StyledFormFooter>
        <Button
          variant='contained'
          type='submit'
          disabled={formik.isSubmitting}
        >
          Сохранить
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
      </StyledFormFooter>
    </StyledForm>
  );
};

export const EditUserForm = memo(EditUserFormComp);
