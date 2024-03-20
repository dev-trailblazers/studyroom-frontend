import { Input as CustomInput } from '@material-tailwind/react';

interface InputProps {
  type?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type = 'text', label, value, onChange }: InputProps) => {
  return (
    <CustomInput
      data-value={value.length > 0 ? 'true' : 'false'}
      label={label}
      value={value}
      type={type}
      onChange={onChange}
      onPointerEnterCapture={{}}
      onPointerLeaveCapture={{}}
      crossOrigin={{}}
      className={`peer  peer-placeholder-shown:text-[12px] h-[40px] peer: placeholder-shown:border-gray_DD placeholder-shown:border-t-gray_DD border-gray_DD border  focus:border-gray_DD text-black focus:border-t `}
      labelProps={{
        className:
          'text-gray_CC peer-focus:text-gray_CC peer-focus:before:border-t peer-focus:before:border-l peer-focus:before:border-gray_DD peer-focus:after:border-t peer-focus:after:border-r peer-placeholder-shown:pt-1 peer-placeholder-shown:text-gray_DD peer-placeholder-shown:text-[12px] peer-focus:pt-0 peer-data-[value=true]:pt-0 peer-data-[value=true]:border-t-gray_DD peer-data-[value=true]:border-l-gray_DD before:border-gray_DD before:border-tl before:rounded-tl-lg after:border-tr after:border-gray_DD after:rounded-tr-lg peer-focus:before:border-t-gray_DD ',
      }}
    />
  );
};

export default Input;
