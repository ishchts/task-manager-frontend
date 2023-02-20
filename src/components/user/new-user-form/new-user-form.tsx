import React, { memo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';

import { Button, TextField } from '@mui/material';

import { User } from '../../../store/features/users/user-slice';
import { useCreateNewUserMutation } from '../../../services/users';

import { LoadingOverlay } from '../../loading-overlay';

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
    .email(),
  password: yup
    .string()
    .required('No password provided.')
    .min(3, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

export type NewUserFormProps = {
  onSubmitStart?: () => void
  onSubmitSuccess?: (res: Omit<User, 'id' | 'createdAt'>) => void
  onSubmitError?: (e: unknown) => void
  onCancel?: () => void
};

const NewUserFormComp: React.FC<NewUserFormProps> = ({
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError,
  onCancel
}) => {
  const [createNewUser, newUserMetaData] = useCreateNewUserMutation();

  const formik = useFormik<typeof initialValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (onSubmitStart) {
          onSubmitStart();
        }
        const res = await createNewUser(values).unwrap();
        if (onSubmitSuccess) {
          onSubmitSuccess(res);
        }
      } catch (e) {
        if (onSubmitError) {
          onSubmitError(e);
        }
      }
    }
  });

  return (
    <>
      <LoadingOverlay open={newUserMetaData.isLoading} />
      <StyledForm onSubmit={formik.handleSubmit}>
      <TextField
        margin='normal'
        variant="outlined"
        fullWidth={true}
        label="Имя"
        name="firstName"
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
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onChange={formik.handleChange}
      />
      <TextField
        margin='normal'
        variant="outlined"
        fullWidth={true}
        label="Пароль"
        name="password"
        type="password"
        error={Boolean(formik.touched.password && formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        onChange={formik.handleChange}
      />
      <StyledFormFooter>
        <Button
          variant='contained'
          type='submit'
          disabled={formik.isSubmitting}
        >Создать</Button>
        {onCancel && (
          <>
            {' '}
            <Button
              variant='contained'
              type='button'
              color='error'
              onClick={onCancel}
            >
              Отмена
            </Button>
          </>
        )}
      </StyledFormFooter>
    </StyledForm>
    </>
  );
};

export const NewUserForm = memo(NewUserFormComp);
