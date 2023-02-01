import React from 'react';
import { Outlet, useNavigate } from 'react-router';

import { GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';

import { useAppSelector } from '../../store';
import { isAuth } from '../../store/auth/auth-slice';

import { Layout } from '../../components/layout';
import { CustomDataGrid } from '../../components/custom-data-grid';

import { useGetUsersQuery } from '../../services/users';

const StyledPageTitle = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledActions = styled('div')`
  margin-top: 20px;
  margin-bottom: 30px;
  a {
    margin-right: 10px;
  }
  button {
    margin-right: 10px;
  }
`;

const StyledContent = styled('div')`
  height: calc(100% - 168px);
`;

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
  const req = useGetUsersQuery();
  const isAuthUser = useAppSelector(isAuth);
  const { data, error, isLoading } = req;

  if (error) {
    return (
      <div>
        error
      </div>
    );
  }

  return (
    <Layout>
      <StyledPageTitle variant="h4" variantMapping={{ h4: 'h1' }}>
        Пользователи
      </StyledPageTitle>
      <StyledActions>
        <Button
          href='new'
          variant='contained'
          color='primary'
        >
          Создать
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            navigate('1/edit', { replace: isAuthUser });
          }}
        >
          Редактировать
        </Button>
        <Button
          variant='outlined'
          color='error'
          startIcon={<DeleteIcon />}
        >
          Удалить
        </Button>
      </StyledActions>
      <StyledContent>
          <CustomDataGrid
            columns={columns}
            rows={data ?? []}
            loading={isLoading}
          />
      </StyledContent>
      <Outlet />
    </Layout>
  );
};

export default List;
