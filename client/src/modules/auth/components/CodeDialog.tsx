import { InputOtp, InputOtpChangeEvent } from 'primereact/inputotp';
import { Dialog } from 'primereact/dialog';
import { createPortal } from 'react-dom';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAccessKeyService } from '../services/GetAccesKeyService';
import useStorage from '../../shared/hooks/useStorage';

interface CodeDialogProps {
  readonly visible: boolean;
  readonly onHide: () => void;
}

function CodeDialog({ visible, onHide }: CodeDialogProps) {
  const [, setValue] = useStorage<string>('accessKey', '');

  const navigate = useNavigate();
  const code = useRef('');

  const handleChange = async (e: InputOtpChangeEvent) => {
    code.current = e.value?.toString() ?? '';
    if (code.current.length !== 6)
      return;
    
    const access = await GetAccessKeyService(code.current);
    
    if (access.authorization)
      setValue(access.authorization);

    if (access.success)
      navigate('/community');
  }

  return (
    <>
      {
        createPortal(
          <Dialog header='Ingresa el código' visible={visible} onHide={onHide}>
            <div className='flex flex-col gap-5 items-center'>
              <InputOtp length={6} onChange={handleChange} />
              <p className='w-[300px] text-center text-[#5e5e5e]'>El código de autenticación se encuentra en tu correo electrónico</p>
            </div>
          </Dialog>,
          document.body
        )
      }
    </>
  );
}

export default CodeDialog;