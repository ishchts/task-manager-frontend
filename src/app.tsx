import React from 'react';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { Layout } from './components/layout';

import { UserDetail } from './pages/user-detail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<div>500</div>} >
      <Route errorElement={<div>404</div>} >
        <Route index element={<div>index element</div>} />
        <Route path='users' element={<div>users</div>} />
        <Route path='users/:id' element={<UserDetail />} />
        <Route path='users/:id/edit' element={<div>user edit</div>} />
        <Route path='users/:id/new' element={<div>user new</div>} />
        <Route path='statuses' element={<div>statuses</div>} />
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
