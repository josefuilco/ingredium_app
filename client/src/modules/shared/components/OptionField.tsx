import { useState } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface OptionFieldProps {
  readonly name: string;
  readonly label: string;
  readonly options: Array<{ label: string; value: string | number }>;
  readonly instruction?: string;
  readonly classname?: string;
  readonly value?: string | number;
  readonly onChange?: (e: DropdownChangeEvent) => void;
}

const optionfieldClassname = 'flex flex-col gap-2';

function OptionField({ 
  name, 
  label, 
  options, 
  instruction, 
  classname,
  value: initialValue,
  onChange 
}: OptionFieldProps) {
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(initialValue);

  const handleChange = (e: DropdownChangeEvent) => {
    setSelectedValue(e.value);
    onChange?.(e);
  };

  return (
    <div className={classname ? `${optionfieldClassname} ${classname}` : optionfieldClassname}>
      <label className='font-bold' htmlFor={name}>
        {label}
      </label>
      <Dropdown
        className='h-[40px] w-full hover:border-orange-normal focus:shadow-[0_0_0_0.2rem_rgba(252,144,87,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(252,144,87,0.5)] dark:border-orange-normal/40 dark:hover:border-orange-normal'
        id={name}
        name={name}
        options={options}
        value={selectedValue}
        onChange={handleChange}
      />
      {
        instruction
          ? <p className='text-[#5e5e5e]'>{instruction}</p>
          : <></>
      }
    </div>
  );
}

export default OptionField;