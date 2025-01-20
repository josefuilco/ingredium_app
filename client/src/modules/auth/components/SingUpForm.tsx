import { Link } from "react-router-dom";
import ActionButton from "../../shared/components/ActionButton";
import TextField from "../../shared/components/TextField";
import Logotype from "./Logotype";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
}

function SignUpForm() {
  return (
    <form className='flex flex-col w-[300px] gap-5 md:w-[350px]' onSubmit={handleSubmit}>
      <Logotype />
      <p>Crea una cuenta facil.</p>
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
      <TextField
        name='nacionality'
        label='Nacionalidad'
        instruction='Ingresa tu nacionalidad'
      />
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