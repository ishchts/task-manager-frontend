import React, { useState, memo } from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';

import {
  Button,
  Chip,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';

import { useGetTaskByIdQuery, useEditTaskByIdMutation, TaskDetail, EditTaskBody } from '../../services/tasks';
import { useGetUsersQuery } from '../../services/users';
import { useGetStatusesQuery } from '../../services/statuses';
import { LoadingOverlay } from '../loading-overlay';
import { PageTitle } from '../page-title';
import { PageActionBar } from '../page-action-bar/page-action-bar';

const EditTaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

const EditTaskContent = styled.div`
  flex-grow: 1;
  max-width: 1260px;
`;

const EditTaskSidebar = styled.div`
  flex-grow: 0;
  width: 420px;
  padding: 45px 0 0 20px;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  height: 100%;
`;

const EditTaskHeader = styled.div`
  width: 100%;
`;

const EditTaskName = styled.div`
  position: relative;
  min-height: 45px;
  word-wrap: break-word;
`;

const EditTaskNameField = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: #fff;
  width: calc(100% - 24px);
`;

const EditTaskDescription = styled.div`
  position: relative;
  height: calc(100% - 150px);
  padding-right: 24px;
  padding-bottom: 24px;
  word-wrap: break-word;
`;

type EditTaskProps = {
  taskId: string
};

const EditTaskComp: React.FC<EditTaskProps> = ({
  taskId
}) => {
  const { data: statuses } = useGetStatusesQuery(undefined);
  const { data: usersData } = useGetUsersQuery(undefined);
  const { data: taskDetailData, isLoading, isFetching } = useGetTaskByIdQuery(taskId);

  const [editTask, { isLoading: editTaskIsLoading }] = useEditTaskByIdMutation();

  const formik = useFormik<TaskDetail>({
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    initialValues: taskDetailData ?? {} as TaskDetail,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!values) {
        return;
      }

      const body: EditTaskBody = {
        id: Number(taskId),
        name: values.name,
        description: values.description,
        statusId: values.statusId,
        executorId: values.executorId,
        labelIds: values.labels.map((label) => (label.id))
      };

      await editTask(body);
    }
  });

  const [isEditName, setIsEditName] = useState(false);
  const [isEditDesc, setIsEditDesc] = useState(false);

  return (
    <>
      <LoadingOverlay open={isLoading || editTaskIsLoading || isFetching} />
      <EditTaskContainer>
        <EditTaskContent>
          <EditTaskHeader>
            <PageTitle>
                <EditTaskName>
                  {taskDetailData?.name}
                  <IconButton
                    color='default'
                    onClick={() => {
                      setIsEditName(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  {isEditName && (
                    <EditTaskNameField>
                      <TextField
                        name='name'
                        ref={(instance) => {
                          instance?.querySelector('input')?.focus();
                        }}
                        value={formik.values?.name}
                        onChange={formik.handleChange}
                        inputProps={{
                          maxLength: 255
                        }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <IconButton
                                onClick={() => {
                                  setIsEditName(false);
                                  void formik.submitForm();
                                }}
                              >
                                <DoneIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setIsEditName(false);
                                }}
                              >
                                <CancelIcon />
                              </IconButton>
                            </>
                          )
                        }}
                        fullWidth={true}
                      />
                    </EditTaskNameField>
                  )}
                </EditTaskName>
              </PageTitle>
              <PageActionBar>
                <Button variant='contained' color='inherit'>Редактировать</Button>
              </PageActionBar>
          </EditTaskHeader>
          <EditTaskDescription>
            <Typography paragraph={true}>
              Описание:
              {!isEditDesc && (
                <IconButton
                  onClick={() => {
                    setIsEditDesc(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
              {isEditDesc && (
                <IconButton
                  onClick={() => {
                    setIsEditDesc(false);
                    void formik.submitForm();
                  }}
                >
                  <DoneIcon />
                </IconButton>
              )}
            </Typography>
            <TextField
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              disabled={!isEditDesc}
              rows={21}
              maxRows={21}
              multiline={true}
              fullWidth={true}
            />
          </EditTaskDescription>
        </EditTaskContent>
        <EditTaskSidebar>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ display: 'flex' }} alignItems='center' justifyContent='space-between'>
              Статус:
              {formik.values?.statusId && (
                <TextField
                  name='statusId'
                  select
                  style={{ width: 280 }}
                  size='small'
                  defaultValue={formik.values?.statusId}
                  onChange={(e) => {
                    formik.handleChange(e);
                    void formik.submitForm();
                  }}
                >
                  {statuses?.ids.map((id) => {
                    const status = statuses.entities[id];
                    if (!status) {
                      return null;
                    }

                    return (
                      <MenuItem key={id} value={status.id} >{status.name}</MenuItem>
                    );
                  })}
                </TextField>
              )}
            </Grid>
            <Grid item xs={12} style={{ display: 'flex' }} alignItems='center' justifyContent='space-between'>
              Исполнитель:
              {(formik.values?.executorId || formik.values?.executorId === 0) && (
                <TextField
                  name='executorId'
                  select
                  style={{ width: 280 }}
                  size='small'
                  defaultValue={formik.values?.executorId}
                  onChange={(e) => {
                    formik.handleChange(e);
                    void formik.submitForm();
                  }}
                >
                  {<MenuItem key={0} value={0}>Не назначен</MenuItem>}
                  {usersData?.ids.map((id) => {
                    const user = usersData.entities[id];
                    if (!user) {
                      return null;
                    }

                    return (
                      <MenuItem key={id} value={user.id} >{user.firstName} {user.lastName}</MenuItem>
                    );
                  })}
                </TextField>
              )}
            </Grid>
            <Grid item xs={12} style={{ display: 'flex' }} alignItems='center' justifyContent='space-between'>
              Автор:
              <div style={{ width: 280 }}>
                {usersData?.entities[Number(taskDetailData?.creatorId)]?.firstName}
                {usersData?.entities[Number(taskDetailData?.creatorId)]?.lastName}
              </div>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex' }} alignItems='center' justifyContent='space-between'>
              Создано:
              <div style={{ width: 280 }}>
                {taskDetailData?.createdAt}
              </div>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex' }} alignItems='center' justifyContent='space-between'>
              Обновлено:
              <div style={{ width: 280 }}>
                {taskDetailData?.updatedAt}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                {taskDetailData?.labels.map((el) => (
                  <Chip key={el.id} label={el.name} />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </EditTaskSidebar>
      </EditTaskContainer>
    </>
  );
};

export const EditTask = memo(EditTaskComp);
