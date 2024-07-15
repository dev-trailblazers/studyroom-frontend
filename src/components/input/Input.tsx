import { Input as CustomInput } from '@material-tailwind/react';
import { useState } from 'react';

interface InputProps {
  id?: string;
  type?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  isError?: boolean;
  error?: string;
}

const Input = ({
  id,
  type = 'text',
  label,
  value,
  onChange,
  onKeyPress,
  disabled,
  className,
  isError = false,
  error = '잘못된 입력값입니다.',
}: InputProps) => {
  // type='password'일 경우, 보이기/숨기기 버튼 추가
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordType = type === 'password';

  // 비밀번호 보이기/숨기기
  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex w-full max-w-[24rem]">
        <CustomInput
          id={id}
          data-value={value ? 'true' : 'false'}
          label={label}
          value={value}
          type={isPasswordType && isPasswordVisible ? 'text' : type}
          disabled={disabled}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onPointerEnterCapture={{}}
          onPointerLeaveCapture={{}}
          crossOrigin={{}}
          containerProps={{
            className: `${className && `!min-w-0 ${className}`}`,
          }}
          className={`bg-white h-[40px] px-[16px] peer relative placeholder-shown:border-gray_DD placeholder-shown:border-t-gray_DD focus:border-gray_DD first:border-t !text-black data-[value=true]:border-gray_DD data-[value=true]:border-t-0 focus:!border focus:!border-t-0  text-[12px]
          `}
          labelProps={{
            className: `peer-placeholder-shown:text-gray_DD peer-placeholder-shown:!text-[12px] peer-placeholder-shown:!pl-1 peer-placeholder-shown:!pt-1 peer-focus:!text-[11px] peer-focus:!pt-0 peer-focus:!pl-0 peer-focus:!text-[#9e9e9e] before:border-gray_DD after:border-gray_DD  peer-focus:before:!border-t peer-focus:before:!border-l peer-focus:before:!border-gray_DD  peer-focus:after:!border-t peer-focus:after:!border-r  peer-focus:after:!border-gray_DD`,
          }}
        />
        {isPasswordType && (
          <button
            onClick={togglePasswordVisibility}
            className="!absolute right-2 top-0 bottom-0 rounded w-[20px] align-middle flex items-center justify-center "
          >
            <span className="material-symbols-outlined text-[20px] text-gray-300">
              {isPasswordVisible ? 'visibility' : 'visibility_off'}
            </span>
          </button>
        )}
      </div>
      {isError && (
        <span className="text-[11px] text-red-400 px-2">{error}</span>
      )}
    </>
  );
};

export default Input;
