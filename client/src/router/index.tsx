import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../modules/auth/pages/SignInPage';
import SignUpPage from '../modules/auth/pages/SingUpPage';
import CommunityPage from '../modules/recipes/pages/CommunityPage';
import RecipesPage from '../modules/recipes/pages/RecipesPage';
import EspecificRecipePage from '../modules/recipes/pages/EspecificRecipePage';
import EditEspecificRecipePage from '../modules/recipes/pages/EditEspecificRecipePage';
import NewRecipePage from '../modules/recipes/pages/NewRecipePage';
import NewIngredientPage from '../modules/recipes/pages/NewIngredientPage';
import VerRecipeAjenaPage from '../modules/recipes/pages/VerRecipeAjenaPage';
import ProfilePage from '../modules/recipes/pages/ProfilePage';

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
    path: '/community/:userId/:recipeId',
    element: <VerRecipeAjenaPage />
  },
  {
    path: '/recipes/',
    element: <RecipesPage />
  },
  {
    path: '/recipes/:id',
    element: <EspecificRecipePage />
  },
  {
    path: '/recipes/new',
    element: <NewRecipePage />
  },
  {
    path: '/recipes/:id/edit',
    element: <EditEspecificRecipePage />
  },
  {
    path: '/ingredients/new',
    element: <NewIngredientPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  }
]);