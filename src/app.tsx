import React from 'react';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { Link } from '@mui/material';

import UsersList from './pages/users/list';
import UserEdit from './pages/users/edit';
import UserNew from './pages/users/new';

import { Layout } from './components/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<Layout>500</Layout>} >
      <Route errorElement={<Layout>404</Layout>} >
        <Route index element={<Layout>index element <Link>activiti</Link></Layout>} />
        <Route path='users' element={<UsersList />}>
          <Route path=':id/edit' element={<UserEdit />} />
        </Route>
        <Route path='users/new' element={<UserNew />} />
        <Route path='statuses' element={<Layout>statuses</Layout>} />
        <Route path='labels' element={<div>labels</div>} />
        <Route path='tasks' element={<div>tasks</div>} />
        <Route path='sign-in' element={<div>sign in</div>} />
        <Route path='sign-up' element={<div>sign up</div>} />
        <Route path='sign-out' element={<div>sign out</div>} />
      </Route>
    </Route>
  )
);

export const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};
