import { Button } from 'primereact/button';
import { MouseEventHandler } from 'react';

interface ActionButtonProps {
  readonly label: string;
  readonly type?: 'submit' | 'button' | 'reset';
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
}

function ActionButton({ label, type, onClick }: ActionButtonProps) {
  return (
    <Button className='h-[40px] bg-mint-normal hover:bg-mint-hover hover: border-none focus:shadow-none' label={label} onClick={onClick} type={type} />
  );
}

export default ActionButton;