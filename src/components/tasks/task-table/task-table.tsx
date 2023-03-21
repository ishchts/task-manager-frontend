import React, { memo, useCallback, useMemo, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import { useGetTasksQuery, TaskQueryParams } from '../../../services/tasks';

import { CustomDataGrid } from '../../custom-data-grid';
import { RemoveTaskDialog } from '../remove-task-dialog';

const buildColumns = (
  onRemoveTaskSubmitStart: () => void,
  onRemoveTaskSubmitSuccess: () => void
): GridColDef[] => ([
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
          justifyContent: 'center',
          width: '100%',
          padding: '0 10px'
        }}>
          <RemoveTaskDialog
            taskId={params.row.id}
            taskName={params.row.name}
            onSubmitStart={onRemoveTaskSubmitStart}
            onSubmitSuccess={onRemoveTaskSubmitSuccess}
            onSubmitError={onRemoveTaskSubmitSuccess}
          />
        </div>
      );
    }
  }
]);

type TaskTableProps = {
  filters?: TaskQueryParams
};

const TaskTableComp: React.FC<TaskTableProps> = ({
  filters = {
    status: undefined,
    label: undefined,
    executor: undefined,
    isCreator: false
  }
}) => {
  const { data = [], isLoading, isFetching } = useGetTasksQuery(filters);
  const [removeTaskIsLoading, setRemoveTaskIsLoading] = useState(false);

  const handleSubmitStart = useCallback(() => {
    setRemoveTaskIsLoading(true);
  }, []);

  const handleSubmitSuccess = useCallback(() => {
    setRemoveTaskIsLoading(false);
  }, []);

  const columns = useMemo(() => buildColumns(handleSubmitStart, handleSubmitSuccess), [handleSubmitStart, handleSubmitSuccess]);

  return (
    <CustomDataGrid
      columns={columns}
      rows={data}
      loading={isLoading || isFetching || removeTaskIsLoading}
    />
  );
};

export const TaskTable = memo(TaskTableComp);
