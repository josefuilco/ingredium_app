import { InputText } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';

interface TextFieldProps {
  readonly name: string;
  readonly label: string;
  readonly instruction?: string;
  readonly restriction?: KeyFilterType;
  readonly classname?: string;
}

const textfieldClassname = 'flex flex-col gap-2';

function TextField({ name, label, instruction, restriction, classname }: TextFieldProps) {
  return (
    <div className={classname ? textfieldClassname : `${textfieldClassname} ${classname}`}>
      <label className='font-bold' htmlFor={ name }>
        { label }
      </label>
      <InputText
        className='h-[40px] w-full hover:border-mint-normal focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,0.5)]'
        id={ name }
        name={ name }
        keyfilter={ restriction }
      />
      {
        instruction
        ? <p className='text-[#5e5e5e]'>{ instruction }</p>
        : <></>
      }
    </div>
  );
}

export default TextField;