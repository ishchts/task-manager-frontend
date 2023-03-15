import React, { memo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Button,
  MenuItem,
  TextField,
  Autocomplete,
  Checkbox
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useGetStatusesQuery } from '../../services/statuses';
import { useGetLabelsQuery, Labels } from '../../services/labels';
import { useGetUsersQuery } from '../../services/users';
import { useCreateTaskMutation } from '../../services/tasks';

import { LoadingOverlay } from '../loading-overlay';

const taskSchema = yup.object().shape({
  name: yup.string().trim().required('Обязательное поле').min(3),
  statusId: yup.number().min(1, 'Обязательное поле').required('Обязательное поле')
});

type FormValues = {
  name: string
  description: string
  statusId: number
  executorId: number | null
  labelIds: Labels
};

type AddTaskProps = {
  onCancel?: () => void
  onSubmitSuccess?: () => void
};

const AddTaskComp: React.FC<AddTaskProps> = ({
  onCancel,
  onSubmitSuccess
}) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const {
    data: statuses
  } = useGetStatusesQuery(undefined);

  const { data: users } = useGetUsersQuery(undefined);

  const {
    data: labels = []
  } = useGetLabelsQuery(undefined);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      description: '',
      statusId: -1,
      executorId: null,
      labelIds: []
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      await createTask({
        ...values,
        labelIds: values.labelIds.map((label) => {
          return label.id;
        })
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }
  });

  return (
    <>
      <LoadingOverlay open={isLoading} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          margin='normal'
          label='Наименование'
          fullWidth={true}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          margin='normal'
          label='Описание'
          fullWidth={true}
          multiline={true}
          rows={5}
          maxRows={5}
        />
        <TextField
          name='statusId'
          value={formik.values.statusId}
          onChange={formik.handleChange}
          margin='normal'
          label='Статус'
          fullWidth={true}
          select={true}
          error={Boolean(formik.touched.statusId && formik.errors.statusId)}
          helperText={formik.touched.statusId && formik.errors.statusId}
        >
          {statuses?.ids.map((statusId) => {
            const status = statuses.entities[statusId];

            if (!status) {
              return null;
            }

            return (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          name='executorId'
          value={formik.values.executorId}
          onChange={formik.handleChange}
          margin='normal'
          label='Исполнитель'
          fullWidth={true}
          select={true}
          error={Boolean(formik.touched.executorId && formik.errors.executorId)}
          helperText={formik.touched.executorId && formik.errors.executorId}
        >
          {users?.ids.map((userId) => {
            const user = users.entities[userId];

            if (!user) {
              return null;
            }

            return (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            );
          })}
        </TextField>
        <Autocomplete
          multiple
          disableCloseOnSelect={true}
          getOptionLabel={(option) => option.name}
          options={labels}
          renderOption={(props, option, state) => {
            return (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={state.selected}
                />
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                name='labels'
                label='Метки'
                placeholder='Метки'
                margin='normal'
              />
            );
          }}
          onChange={(event, value) => {
            void formik.setFieldValue('labelIds', value);
          }}
        />
        <div>
          <Button
            type='submit'
            variant='contained'
          >
            Создать
          </Button>
          {' '}
          {onCancel && (
            <Button
              variant='contained'
              color='error'
              onClick={onCancel}
            >
              Отмена
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export const AddTask = memo(AddTaskComp);
