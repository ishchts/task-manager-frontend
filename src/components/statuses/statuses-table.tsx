import React from 'react';
import { GridColDef } from '@mui/x-data-grid';

import { useGetStatusesQuery } from '../../services/statuses';

import { CustomDataGrid } from '../custom-data-grid';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1
  },
  {
    field: 'name',
    headerName: 'Наименование',
    flex: 1
  },
  {
    field: 'createAt',
    headerName: 'Дата создания',
    flex: 1
  }
];

export const StatusesTable: React.FC = () => {
  const { items, isLoading, isFetching } = useGetStatusesQuery(undefined, {
    selectFromResult: (result) => {
      const { data } = result;

      return ({
        ...result,
        items: data
          ? data.ids.map((id) => data.entities[id])
          : []
      });
    }
  });

  return (
        <CustomDataGrid
          columns={columns}
          rows={items}
          loading={isLoading || isFetching}
        />
  );
};
