import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import React, { memo } from 'react';

import { useGetLabelsQuery } from '../../services/labels';
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
    flex: 1
  },
  {
    field: 'createAt',
    headerName: 'Дата создания',
    flex: 1
  }
];

type LabelsTableProps = {
  onSelectionModelChange: DataGridProps['onSelectionModelChange']
};

const LabelsTableComp: React.FC<LabelsTableProps> = ({
  onSelectionModelChange
}) => {
  const { data: labels = [], isLoading, isFetching } = useGetLabelsQuery(undefined);

  return (
    <CustomDataGrid
      columns={columns}
      rows={labels}
      loading={isLoading || isFetching}
      checkboxSelection={true}
      onSelectionModelChange={onSelectionModelChange}
    />
  );
};

export const LabelsTable = memo(LabelsTableComp);
