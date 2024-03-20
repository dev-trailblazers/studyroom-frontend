import { useId } from 'react';

interface InputProps {
  type?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  id,
}: InputProps) => {
  const uid = useId();

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={`${uid}-${id}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray_DD border-solid rounded-[10px] py-3 pl-5 w-full h-[40px] text-[12px] outline-none placeholder-gray_DD"
      />
    </>
  );
};

export default Input;
