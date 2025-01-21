import { Link, useNavigate } from "react-router-dom";
import ActionButton from "../../shared/components/ActionButton";
import TextField from "../../shared/components/TextField";
import Logotype from "../../shared/components/Logotype";
import { CreateUserService } from "../services/CreateUserService";
import { User } from "../models/User";
import OptionField from "../../shared/components/OptionField";

function SignUpForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const user: User = {
        id: crypto.randomUUID(),
        names: formData.get('names') as string,
        surnames: formData.get('surnames') as string,
        email: formData.get('email') as string,
        nacionality: formData.get('nacionality') as string,
        cellphone: formData.get('cellphone') as string,
      };

      const success = await CreateUserService(user);
      if (success) {
        console.log('User created successfully');
        navigate('/');
      } else {
        console.log('Failed to create user');
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('An error occurred:', error);
      (e.target as HTMLFormElement).reset();
    }
  };


  return (
    <form className='flex flex-col w-[300px] gap-5 md:w-[350px]' onSubmit={handleSubmit}>
      <Logotype />
      <div className="flex gap-5">
        <TextField
          name='names'
          label='Nombres'
          instruction='Coloca tus nombres'
        />
        <TextField
          name='surnames'
          label='Apellidos'
          instruction='Coloca tus apellidos'
        />
      </div>
      <TextField
        name='email'
        label='Correo Electronico'
        instruction='Registra tu correo electronico'
        restriction='email'
      />
      <OptionField name="nacionality" label="Nacionalidad" instruction="Ingresa tu nacionalidad" options={[
        { label: 'Peruana', value: 'Peruana' },
      ]}/>
      <TextField
        name='cellphone'
        label='Numero de Celular'
        instruction='Registra tu numero de celular +51'
        restriction='num'
      />
      <ActionButton label="Continuar" type="submit" />
      <p>Ya tengo una cuenta. <Link className='font-bold transition-colors duration-200 ease-linear hover:text-mint-normal' to='/'>Iniciar Sesión</Link></p>
    </form>
  );
}

export default SignUpForm;