import { Link } from "react-router-dom";
import ActionButton from "../../shared/components/ActionButton";
import TextField from "../../shared/components/TextField";
import CodeDialog from "./CodeDialog";
import Logotype from "./Logotype";
import { useState } from "react";
import { SendCodeService } from "../services/SendCodeService";

function SignInForm() {
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    if (!email)
      return;

    const isSent = await SendCodeService(email);
    
    if (isSent)
      setVisible(true);
  }

  const handleHide = () => {
    if (!visible)
      return;

    setVisible(false);
  }

  return (
    <form className='flex flex-col w-[300px] gap-5 md:w-[350px]' onSubmit={handleSubmit}>
      <Logotype />
      <p>Inicia sesión solo con tu correo</p>
      <TextField
        name='email'
        label='Correo Electronico'
        instruction='Usa tu correo electronico de registro'
        restriction='email'
      />
      <ActionButton label='Continuar' />
      <CodeDialog visible={visible} onHide={handleHide} />
      <p>No tengo una cuenta. <Link className='font-bold transition-colors duration-200 ease-linear hover:text-mint-normal' to='/sign-up'>Crear cuenta</Link></p>
    </form>
  );
}

export default SignInForm;