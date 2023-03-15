import React, { memo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { useGetTasksQuery } from '../../services/tasks';

import { CustomDataGrid } from '../custom-data-grid';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'id',
    flex: 1
  },
  {
    field: 'name',
    headerName: 'Наименование',
    flex: 1,
    renderCell: (params) => {
      return (
        <Link to={`/tasks/${params.id}/detail`}>{params.value}</Link>
      );
    }
  },
  {
    field: 'status',
    headerName: 'Статус',
    flex: 1,
    renderCell: (params) => {
      return (
        <div>{params.value.name}</div>
      );
    }
  },
  {
    field: 'creator',
    headerName: 'Автор',
    flex: 1,
    renderCell: (params) => {
      return (
        <div>{params.value.firstName} {params.value.lastName}</div>
      );
    }
  },
  {
    field: 'executor',
    headerName: 'Исполнитель',
    flex: 1,
    renderCell: (params) => {
      return (
        <div>{params?.value?.firstName} {params?.value?.lastName}</div>
      );
    }
  },
  {
    field: 'createdAt',
    headerName: 'Дата создания',
    flex: 1
  },
  {
    field: 'edit',
    headerName: '',
    flex: 1,
    minWidth: 260,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 10px'
        }}>
          <Button variant='contained' href={`/tasks/${params.id}/edit`}>Изменить</Button>

          {' '}

          <Button
            variant='contained'
            color='error'
          >
            Удалить
          </Button>
        </div>
      );
    }
  }
];

const TaskTableComp: React.FC = () => {
  const { data = [], isLoading } = useGetTasksQuery(undefined);

  return (
    <CustomDataGrid
      columns={columns}
      rows={data}
      loading={isLoading}
    />
  );
};

export const TaskTable = memo(TaskTableComp);
