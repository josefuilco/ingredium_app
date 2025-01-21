import { MultiSelect } from 'primereact/multiselect';

interface MultipleOptionFieldProps {
  readonly name: string;
  readonly label: string;
  readonly options: { label: string, value: string | number }[];
  readonly instruction?: string;
  readonly classname?: string;
}

const optionfieldClassname = 'flex flex-col gap-2';

function MultipleOptionField({ name, label, options, instruction, classname }: MultipleOptionFieldProps) {
  return (
    <div className={classname ? optionfieldClassname : `${optionfieldClassname} ${classname}`}>
      <label className='font-bold' htmlFor={ name }>
        { label }
      </label>
      <MultiSelect
        className='h-[40px] w-full hover:border-mint-normal focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,0.5)]'
        id={ name }
        name={ name }
        options={ options }
      />
      {
        instruction
        ? <p className='text-[#5e5e5e]'>{ instruction }</p>
        : <></>
      }
    </div>
  );
}

export default MultipleOptionField;