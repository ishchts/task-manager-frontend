import React, { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { useAppSelector } from '../../store';

import { useAuth } from '../../hooks/use-auth';

import { Layout } from '../../components/layout';
import { CustomDataGrid } from '../../components/custom-data-grid';
import { NewUserDialog } from '../../components/user/new-user-dialog/new-user-dialog';
import { RemoveUserDialog } from '../../components/user/remove-user-dialog';
import { PageTitle } from '../../components/page-title';
import { PageActionBar } from '../../components/page-action-bar/page-action-bar';
import { PageContent } from '../../components/page-content';

import { useGetUsersQuery, selectAllUsers } from '../../services/users';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'id',
    flex: 1
  },
  {
    field: 'fullName',
    headerName: 'Полное имя',
    flex: 1,
    renderCell: ({ row }) => {
      return <div>{row.firstName} {row.lastName}</div>;
    }
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'createdAt',
    headerName: 'Дата создания',
    flex: 1
  }

];

const List: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, isFetching } = useGetUsersQuery(undefined);

  const { isAuthUser } = useAuth();
  const allUsers = useAppSelector(selectAllUsers);

  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);

  const handleOpenNewUserDialog = useCallback(() => {
    setOpenNewUserDialog(!openNewUserDialog);
  }, [openNewUserDialog]);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const handleSelectionModelChange = useCallback((model: GridSelectionModel) => {
    setSelectionModel(model);
  }, []);

  return (
    <>
      <Layout>
        <PageTitle>
          Пользователи
        </PageTitle>
        <PageActionBar>
          <Button
            variant='contained'
            color='primary'
            onClick={handleOpenNewUserDialog}
          >
            Создать
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              navigate(`${selectionModel[0]}/edit`, { replace: isAuthUser });
            }}
            disabled={selectionModel.length !== 1}
          >
            Редактировать
          </Button>
          <RemoveUserDialog
            disabled={selectionModel.length !== 1}
            userId={Number(selectionModel[0])}
          />
        </PageActionBar>
        <PageContent>
            <CustomDataGrid
              columns={columns}
              rows={allUsers}
              loading={isLoading || isFetching}
              checkboxSelection={true}
              onSelectionModelChange={handleSelectionModelChange}
              selectionModel={selectionModel}
            />
        </PageContent>
        <Outlet />
      </Layout>
      {openNewUserDialog && (
        <NewUserDialog
          open={openNewUserDialog}
          onClose={handleOpenNewUserDialog}
          onCancel={handleOpenNewUserDialog}
          onSubmitSuccess={handleOpenNewUserDialog}
        />
      )}
    </>

  );
};

export default List;
