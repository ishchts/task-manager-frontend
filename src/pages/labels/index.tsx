import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { GridSelectionModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { Layout } from '../../components/layout';

import { PageTitle } from '../../components/page-title';
import { PageActionBar } from '../../components/page-action-bar/page-action-bar';
import { PageContent } from '../../components/page-content';

import { NewLabelDialog } from '../../components/labels/new-label-dialog';
import { EditLabelDialog } from '../../components/labels/edit-label-dialog';
import { LabelsTable } from '../../components/labels/labels-table';
import { NewLabelForm } from '../../components/labels/new-label-form';

const Labels: React.FC = () => {
  const navigate = useNavigate();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const handleSelectionModel = useCallback((selectionModel: GridSelectionModel) => {
    setSelectionModel(selectionModel);
  }, []);

  return (
    <Layout>
      <PageTitle>
        Метки
      </PageTitle>
      <PageActionBar>
        <Button
          onClick={() => {
            navigate('new', { replace: true });
          }}
          variant='contained'
          color='primary'
        >
          Создать
        </Button>
        <Button
          onClick={() => {
            navigate(`${selectionModel[0]}/edit`, { replace: true });
          }}
          variant='contained'
          color='secondary'
          disabled={selectionModel.length !== 1}
        >
          Редактировать
        </Button>
        <Button
          variant='contained'
          color='error'
          disabled={selectionModel.length !== 1}
        >
          Удалить
        </Button>
      </PageActionBar>
      <PageContent>
        <LabelsTable
          onSelectionModelChange={handleSelectionModel}
        />
      </PageContent>
      <Routes>
        <Route
          path='new'
          element={
            <NewLabelDialog
              onClose={() => {
                navigate('/labels', { replace: true });
              }}
            >
              <NewLabelForm
                onSubmitSuccess={() => {
                  navigate('/labels', { replace: true });
                }}
              />
            </NewLabelDialog>
          }
        />
        <Route
          path=':id/edit'
          element={
            <EditLabelDialog
              onClose={() => {
                navigate('/labels', { replace: true });
              }}
              onCancel={() => {
                navigate('/labels', { replace: true });
              }}
            />
          }
        />
      </Routes>
    </Layout>
  );
};

export default Labels;
