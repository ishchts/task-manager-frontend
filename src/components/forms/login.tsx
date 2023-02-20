import React, { memo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';

import { Button, TextField } from '@mui/material';

import { SignUpParamResult, useSignUpMutation } from '../../services/auth';

import { LoadingOverlay } from '../loading-overlay';

const StyledForm = styled.form``;

const StyledFormFooter = styled.div`
  margin-top: 20px;
`;

const validationSchema = yup.object().shape({
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
  email: '',
  password: ''
};

export type LoginProps = {
  onSubmitStart?: () => void
  onSubmitSuccess?: (data: SignUpParamResult) => void
  onSubmitError?: (e: unknown) => void
};

const LoginComp: React.FC<LoginProps> = ({
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError
}) => {
  const [signUp, signUpOptions] = useSignUpMutation();

  const formik = useFormik<typeof initialValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (onSubmitStart) {
          onSubmitStart();
        }
        const res = await signUp(values).unwrap();

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
      <LoadingOverlay open={signUpOptions.isLoading} />
      <StyledForm onSubmit={formik.handleSubmit}>
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
          >Войти</Button>
        </StyledFormFooter>
      </StyledForm>
    </>
  );
};

export const Login = memo(LoginComp);
