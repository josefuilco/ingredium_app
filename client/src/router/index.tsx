import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../modules/auth/pages/SignInPage';
import SignUpPage from '../modules/auth/pages/SingUpPage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/community',
  },
  {
    path: '/community/:id',
  },
  {
    path: '/profile/:id',
  },
  {
    path: '/profile/:id/edit',
  },
  
]);