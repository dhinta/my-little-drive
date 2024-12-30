import { Home, Login, Tags } from '@/pages';
import { createBrowserRouter, redirect } from 'react-router';
import {
  PrivateLayout,
  StrictlyPublicLayout,
} from './shared/components/layouts';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'tags',
        element: <Tags />,
      },
    ],
  },
  {
    path: '/auth',
    element: <StrictlyPublicLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('/auth/login'),
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);
