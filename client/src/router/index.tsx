import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../modules/auth/pages/SignInPage';
import SignUpPage from '../modules/auth/pages/SingUpPage';
import CommunityPage from '../modules/recipes/pages/CommunityPage';

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
    element: <CommunityPage />
  },
  {
    path: '/profile/',
  },
  {
    path: '/profile/:id',
  },
  {
    path: '/recipes/',
  },
  {
    path: '/recipes/:id',
  }
  
]);