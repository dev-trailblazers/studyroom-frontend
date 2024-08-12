import { Input as CustomInput } from '@material-tailwind/react';
import { useState } from 'react';

interface InputProps {
  id?: string;
  type?: string;
  label: string;
  value: string | number;
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
  // focus 여부
  const [isFocused, setIsFocused] = useState(false);
  // type='password'일 경우, 보이기/숨기기 버튼 추가
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordType = type === 'password';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // 비밀번호 보이기/숨기기
  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div
        className={`relative w-full h-[44px] box-border px-[8px] py-[4px] border ${
          isFocused ? 'border border-[#aaaaaa]' : 'border border-[#cccccc]'
        } rounded-lg bg-white `}
      >
        <input
          className={`w-full p-[10px] box-border border-none bg-transparent outline-none text-[14px] text-gray-900 ${
            disabled ? 'text-gray-400' : ''
          }`}
          disabled={disabled}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={id}
          data-value={value ? 'true' : 'false'}
          type={isPasswordType && isPasswordVisible ? 'text' : type}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <span
          className={`absolute left-[14px] transition-all duration-200 ease-in-out transform  ${
            isFocused || value
              ? '-translate-y-[2px] text-[10px] top-1'
              : 'translate-y-[0%] top-[25%] text-[14px]'
          } text-[#cccccc] pointer-events-none `}
        >
          {label}
        </span>
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
      {/* <div className="relative flex w-full max-w-[24rem]">
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
      </div> */}
    </>
  );
};

export default Input;
