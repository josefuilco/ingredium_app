import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../models/Recipe';
import { RecipeServices } from '../services/RecipeServices';
import Navbar from '../../shared/components/Navbar';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { deleteUser, getUser } from '../../shared/services/UserServices';

interface UserProfile {
  names: string;
  surnames: string;
  nacionality: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const recipeServices = new RecipeServices();
  const toast = React.useRef<Toast>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        const fullname = currentUser.fullname.split(', ');
        setUser({
          names: fullname[0],
          surnames: fullname[1],
          nacionality: currentUser.nationality
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        showErrorToast('No se pudo cargar la información del usuario');
      }
    };
    fetchUser();
    loadRecentRecipes();
  }, []);

  const loadRecentRecipes = async () => {
    try {
      const allRecipes = await recipeServices.getMyRecipes();
      setRecentRecipes(allRecipes.data.slice(-3)); // Get last 3 recipes
    } catch (error) {
      console.error('Error loading recipes:', error);
      showErrorToast('No se pudieron cargar las recetas');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      showSuccessToast('Cuenta eliminada correctamente');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      showErrorToast('No se pudo eliminar la cuenta');
    }
  };

  const showSuccessToast = (detail: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Éxito',
      detail
    });
  };

  const showErrorToast = (detail: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail
    });
  };

  return (
    <>
      <Navbar />
      <Toast ref={toast} />
      <ConfirmDialog
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        message="¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
        header="Confirmar eliminación"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteAccount}
        reject={() => setShowDeleteDialog(false)}
        acceptLabel="Sí, eliminar"
        rejectLabel="No, cancelar"
      />
      <div className="min-h-screen bg-[#fafafa] py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* User Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Perfil</h1>
              <Button
                label="Eliminar cuenta"
                icon="pi pi-trash"
                severity="danger"
                onClick={() => setShowDeleteDialog(true)}
              />
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Nombre completo</h2>
                <p className="text-gray-600">{`${user?.names} ${user?.surnames}`}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Nacionalidad</h2>
                <p className="text-gray-600">{user?.nacionality}</p>
              </div>
            </div>
          </div>

          {/* Recent Recipes Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Últimas recetas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="shadow-md hover:shadow-lg transition-shadow"
                  title={recipe.title}
                  subTitle={recipe.purpose}
                  footer={
                    <Button
                      label="Ver"
                      icon="pi pi-eye"
                      className="w-full bg-orange-normal hover:bg-orange-hover border-none"
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                    />
                  }
                >
                  <p className="text-gray-600 line-clamp-2">{recipe.description}</p>
                </Card>
              ))}
              {recentRecipes.length === 0 && (
                <p className="text-gray-500 col-span-3 text-center">
                  No has creado ninguna receta todavía
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;