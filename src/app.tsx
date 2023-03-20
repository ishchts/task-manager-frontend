import React from 'react';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Home from './pages/home';

import UsersList from './pages/users/list';
import UserEdit from './pages/users/edit';

import StatusList from './pages/statuses/list';
import StatusNew from './pages/statuses/new';

import Labels from './pages/labels';

import Tasks from './pages/tasks';

import NotFound from './pages/not-found';

import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';

import { Layout } from './components/layout';
import { RequireAuth } from './components/require-auth';
import { RequireLogout } from './components/require-logout';
import NewTask from './pages/tasks/new-task';
import DetailTask from './pages/tasks/detail-taks';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<Layout>500</Layout>} >
      <Route errorElement={<Layout>404</Layout>} >
        <Route index element={<Home />} />

        <Route path='users' element={<UsersList />}>
          <Route
            path=':id/edit'
            element={
              <RequireAuth>
                <UserEdit />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path='statuses'
          element={
            <RequireAuth>
              <StatusList />
            </RequireAuth>
          }
        >
          <Route path=':id/edit' />
        </Route>
        <Route
          path='statuses/new'
          element={
            <RequireAuth>
              <StatusNew />
            </RequireAuth>
          }
        />

        <Route
          path='labels'
          element={
            <RequireAuth>
              <Labels />
            </RequireAuth>
          }
        >
          <Route path='new' />
          <Route path=':id/edit' />
        </Route>

        <Route
          path='tasks'
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        />

        <Route
          path='tasks/new'
          element={
            <RequireAuth>
              <NewTask />
            </RequireAuth>
          }
        />

        <Route
          path='tasks/:id/detail'
          element={
            <RequireAuth>
              <DetailTask />
            </RequireAuth>
          }
        />

        <Route
          path='sign-in'
          element={
            <RequireLogout>
              <SignIn />
            </RequireLogout>
          }
        />

        <Route
          path='sign-up'
          element={
            <RequireLogout>
              <SignUp />
            </RequireLogout>
          }
        />

      </Route>
      <Route path='/404' element={<NotFound />} />
    </Route>
  )
);

export const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};
