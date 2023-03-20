import React from 'react';
import { useParams } from 'react-router';

import { Layout } from '../../components/layout';
import { EditTask } from '../../components/tasks/edit-task';

const DetailTask: React.FC = () => {
  const { id } = useParams();

  return (
    <Layout>
      <EditTask taskId={String(id)} />
    </Layout>
  );
};

export default DetailTask;
