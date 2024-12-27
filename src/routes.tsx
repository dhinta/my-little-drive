import { Login } from '@/pages/auth/login';
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
        element: <div>Home</div>,
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
