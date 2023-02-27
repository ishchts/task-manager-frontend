import React, { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useGetStatusesQuery } from '../../services/statuses';

import { CustomDataGrid } from '../custom-data-grid';

const getColumns = (onEditButton: StatusesTableProps['onEditButton']): GridColDef[] => {
  return [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      hideable: false
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
    },
    {
      field: 'edit',
      headerName: ' ',
      sortable: false,
      disableColumnMenu: true,
      flex: 0,
      minWidth: 250,
      align: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              if (onEditButton) {
                onEditButton(Number(params.id));
              }
            }}
          >
            Изменить
          </Button>
        );
      }
    },
    {
      field: 'remove',
      headerName: ' ',
      sortable: false,
      disableColumnMenu: true,
      flex: 0,
      minWidth: 250,
      align: 'center',
      renderCell: ({ id }) => {
        return (
          <Button
          variant='outlined'
          color='error'
          startIcon={<DeleteIcon />}
        >
          Удалить
        </Button>
        );
      }
    }
  ];
};

type StatusesTableProps = {
  onEditButton?: (id: number) => void
};

export const StatusesTable: React.FC<StatusesTableProps> = ({ onEditButton }) => {
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

  const columns = useMemo(() => {
    return getColumns(onEditButton);
  }, [onEditButton]);

  return (
        <CustomDataGrid
          initialState={{ columns: { columnVisibilityModel: { id: false } } }}
          columns={columns}
          rows={items}
          loading={isLoading || isFetching}
          hideFooter={true}
          checkboxSelection={false}
        />
  );
};
