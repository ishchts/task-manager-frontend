import React, { useCallback, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';

import { useGetUsersQuery } from '../../services/users';
import { useGetStatusesQuery } from '../../services/statuses';
import { useGetLabelsQuery } from '../../services/labels';
import { TaskQueryParams } from '../../services/tasks';

import { useFilters } from '../../hooks/use-filters';

import { Layout } from '../../components/layout';
import { PageActionBar } from '../../components/page-action-bar/page-action-bar';
import { PageTitle } from '../../components/page-title';
import { PageContent } from '../../components/page-content';
import { TaskTable } from '../../components/tasks/task-table';

const Tasks: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { data: users } = useGetUsersQuery(undefined);
  const { data: statuses } = useGetStatusesQuery(undefined);
  const { data: labels } = useGetLabelsQuery(undefined);

  const { filters, updateFilters } = useFilters<TaskQueryParams>(search, {
    status: undefined,
    label: undefined,
    executor: undefined,
    isCreator: false
  });

  const handleChangeSelectFilter = useCallback<
  (e: ChangeEvent<HTMLInputElement>, checked?: boolean) => void
  >(async (e, checked) => {
      const newFilters = { ...filters, [e.target.name]: typeof checked === 'boolean' ? checked : e.target.value };
      const paramsString = await updateFilters(newFilters);

      navigate(`/tasks${paramsString}`, {
        replace: true
      });
    }, [filters, navigate, updateFilters]);

  const handleCreateButton = useCallback(() => {
    navigate('new');
  }, [navigate]);

  return (
    <Layout>
      <PageTitle>
        Задачи
      </PageTitle>
      <PageActionBar>
        <Button
            onClick={handleCreateButton}
            variant='contained'
            color='primary'
          >
            Создать
          </Button>
          <TextField
            name='executor'
            value={filters.executor}
            onChange={handleChangeSelectFilter}
            select={true}
            label='Исполнители'
            size='small'
            style={{
              width: 300
            }}
          >
            {<MenuItem value={0}>Не назначен</MenuItem>}
            {users?.ids.map((userId) => {
              const user = users.entities[userId];

              if (!user) {
                return null;
              }

              return (
                <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
              );
            })}
          </TextField>
          <TextField
            name='status'
            value={filters.status}
            onChange={handleChangeSelectFilter}
            select={true}
            label='Статус'
            size='small'
            style={{
              width: 300
            }}
          >
            {<MenuItem value={0}>Не назначен</MenuItem>}
            {statuses?.ids.map((statusId) => {
              const status = statuses.entities[statusId];

              if (!status) {
                return null;
              }

              return (
                <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
              );
            })}
          </TextField>
          <TextField
            name='label'
            value={filters.label}
            onChange={handleChangeSelectFilter}
            select={true}
            label='Метка'
            size='small'
            style={{
              width: 300
            }}
          >
            {<MenuItem value={0}>Не назначен</MenuItem>}
            {labels?.map((label) => {
              return (
                <MenuItem key={label.id} value={label.id}>{label.name}</MenuItem>
              );
            })}
          </TextField>
          <FormControlLabel
            name='isCreator'

            label='Только мои задачи'
            control={
              <Checkbox
                checked={filters.isCreator}
                onChange={handleChangeSelectFilter}
              />
            }
          />
      </PageActionBar>
      <PageContent>
        <TaskTable filters={filters} />
      </PageContent>
    </Layout>
  );
};

export default Tasks;
