import { useState } from 'react';

interface SelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value: string;
  setValue: (value: string | undefined) => void;
  className?: string;
  isError?: boolean;
  error?: string;
}

const Select = ({
  options,
  placeholder,
  value,
  setValue,
  className,
  isError,
  error,
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (value: string) => {
    setValue(value);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (option: any) => {
    setIsDropdownOpen(false);
    onChange(option?.value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={`relative w-full h-[48px] box-border px-[10px] py-[18px] border ${
        isDropdownOpen
          ? 'border border-[#aaaaaa]'
          : 'border border-[#cccccc] cursor-pointer'
      } rounded-lg bg-white ${className}`}
      onClick={toggleDropdown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span
        className={`w-full border-none bg-transparent outline-none text-sm text-gray-900`}
        data-value={value ? 'true' : 'false'}
      >
        {value ? options.find((opt) => opt.value === value)?.label : ''}
      </span>
      <span
        className={`absolute left-2.5 top-1 transition-all duration-300 ease-in-out transform pointer-events-none ${
          isFocused || value
            ? '-translate-y-[2px] text-xs top-2 left-2.5'
            : 'translate-y-[0%] top-3.5 text-[14px]'
        } text-gray_77`}
      >
        {placeholder}
      </span>
      <span className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none right-2">
        <svg
          className={`w-4 h-4 text-gray-400 transform transition-transform ${
            isDropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </span>

      {isDropdownOpen && (
        <div className="absolute left-0 z-10 w-full p-3 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-12 max-h-60">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`p-2 text-[14px] cursor-pointer hover:bg-gray-100 hover:rounded-md${
                value ? 'bg-gray-200' : ''
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {isError && (
        <span className="text-[11px] text-red-400 px-2">{error}</span>
      )}
    </div>
  );
};

export default Select;
